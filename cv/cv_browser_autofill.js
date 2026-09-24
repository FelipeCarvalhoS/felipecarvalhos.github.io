;(function () {
    'use strict'

    function* walkAll(obj, path = []) {
        yield [path, obj]
        if (obj !== null && typeof obj === 'object') {
            for (const [key, value] of Object.entries(obj)) {
                yield* walkAll(value, [...path, key])
            }
        }
    }

    function getByPath(obj, path) {
        const keys = Array.isArray(path) ? path : path.split('.')
        return keys.reduce((acc, key) => acc?.[key], obj)
    }

    // ------------------------------------------------------------------
    // 1. PROFILE
    //
    //    A field can be a plain string (same in every language) or an
    //    object like { en: '...', 'pt-br': '...' } in case a different value
    //    is needed depending on the language the form field was detected in.
    // ------------------------------------------------------------------

    function getProfile() {
        return GM_getValue('cvProfile')
    }

    function saveProfile(p) {
        GM_setValue('cvProfile', p)
    }

    GM_registerMenuCommand('Edit Autofill Profile', () => {
        const current = getProfile()
        const raw = prompt('Edit your profile as JSON, then OK:', JSON.stringify(current, null, 2))
        if (raw) {
            try {
                saveProfile(JSON.parse(raw))
                alert('Profile saved.')
            } catch (e) {
                alert('Invalid JSON, not saved: ' + e.message)
            }
        }
    })

    // ------------------------------------------------------------------
    // 2. Keyword -> profile field mapping.
    //    EN_KEYS and PT_KEYS live separately per field so you can extend
    //    either language on its own; FIELD_RULES combines them and is
    //    what actually gets matched against.
    // ------------------------------------------------------------------

    const fields = {
        firstName: {
            en: ['first name', 'given name', 'firstname'],
            'pt-br': ['primeiro nome', 'nome próprio'],
        },
        lastName: {
            en: ['last name', 'surname', 'family name', 'lastname'],
            'pt-br': ['sobrenome', 'último nome', 'apelido'],
        },
        fullName: {
            en: ['full name', 'your name', 'fullname'],
            'pt-br': ['nome completo', 'seu nome', 'nome e sobrenome'],
        },
        cpf: {
            en: ['cpf'],
            'pt-br': ['cpf', 'cadastro de pessoa física'],
        },

        contact: {
            email: {
                en: ['email'],
                'pt-br': ['e-mail', 'email'],
            },
            phone: {
                default: false,
                noCountryCode: {
                    en: ['phone', 'mobile', 'telephone', 'cell'],
                    'pt-br': ['telefone', 'celular', 'número de telefone'],
                },
            },
            linkedin: {
                en: ['linkedin'],
                'pt-br': ['linkedin'],
            },
            portfolio: {
                en: ['site', 'portfolio', 'personal site', 'blog'],
                'pt-br': ['site', 'portfólio', 'página pessoal', 'blog'],
            },
            github: {
                en: ['github'],
                'pt-br': ['github'],
            },
        },

        address: {
            line: {
                en: ['address', 'street'],
                'pt-br': ['endereço', 'rua', 'logradouro'],
            },
            neighborhood: {
                en: ['neighborhood', 'district', 'suburb'],
                'pt-br': ['bairro', 'distrito', 'subúrbio'],
            },
            city: {
                en: ['city', 'town'],
                'pt-br': ['cidade'],
            },
            state: {
                en: ['state', 'province', 'region'],
                'pt-br': ['estado', 'província', 'região'],
            },
            zip: {
                en: ['zip', 'postal'],
                'pt-br': ['cep', 'código postal'],
            },
            country: {
                en: ['country'],
                'pt-br': ['país'],
            },
        },

        rg: {
            number: {
                en: ['rg', 'registro geral', 'general registry'],
                'pt-br': ['rg', 'registro geral'],
            },
            issuingAgency: {
                en: ['issuing agency', 'issuing authority'],
                'pt-br': ['emissor', 'órgão'],
            },
            issuingState: {
                en: ['issuing state', 'issuing province'],
                'pt-br': ['estado emissor', 'província emissor'],
            },
            issuingDate: {
                en: ['issuing date', 'date of issue'],
                'pt-br': ['data de emissão', 'data', 'emitido', 'expedido'],
            },
        },

        summary: {
            en: ['cover letter', 'why do you want', 'additional information'],
            'pt-br': [
                'resumo',
                'carta de apresentação',
                'por que você quer',
                'informações adicionais',
            ],
        },

        skills: {
            en: ['skills', 'competencies', 'abilities'],
            'pt-br': ['habilidades', 'competências', 'capacidades'],
        },

        education: false,
        experience: false,
        languages: false,
        honors: false,
        projects: false,
    }

    // Combined rules actually used for matching. Each rule keeps its EN
    // and PT-BR keys separate (not just merged) so that, once a field is
    // matched, we know *which* language it was written in and can pick
    // the matching translation out of the profile value.
    const FIELD_RULES = []

    for (const [path, rules] of walkAll(fields)) {
        const isLeaf = typeof rules === 'object' && Object.keys(rules).includes('pt-br')
        if (rules === false || !isLeaf) continue // skip fields that are disabled

        FIELD_RULES.push({
            path,
            enKeys: rules.en,
            ptBrKeys: rules['pt-br'],
        })
    }

    console.log(FIELD_RULES)

    // ------------------------------------------------------------------
    // 3. Helpers to figure out what a field "means"
    // ------------------------------------------------------------------
    function getFieldLabelText(el) {
        let text = ''

        // <label for="id">
        if (el.id) {
            const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
            if (label) text += ' ' + label.innerText
        }
        // wrapping <label>
        const parentLabel = el.closest('label')
        if (parentLabel) text += ' ' + parentLabel.innerText

        // aria-label / aria-labelledby
        if (el.getAttribute('aria-label')) text += ' ' + el.getAttribute('aria-label')
        const labelledBy = el.getAttribute('aria-labelledby')
        if (labelledBy) {
            labelledBy.split(' ').forEach(id => {
                const node = document.getElementById(id)
                if (node) text += ' ' + node.innerText
            })
        }

        // placeholder, name, id as fallback signals
        text += ' ' + (el.placeholder || '')
        text += ' ' + (el.name || '')
        text += ' ' + (el.id || '')

        // last resort: nearby sibling text (bad-markup forms)
        text += ' ' + getNearbyContainerText(el)

        return text.toLowerCase()
    }

    // Fallback for markup where the "label" is just a nearby sibling
    // element (e.g. <div class="formTitle">LinkedIn</div>) rather than
    // a real <label>, aria-label, placeholder, name or id.
    function getNearbyContainerText(el) {
        let container = el.parentElement
        let hops = 0
        let text = ''

        while (container && hops < 4 && !/^(FORM|BODY|HTML)$/.test(container.tagName)) {
            const realInputs = container.querySelectorAll(
                'input:not([type="hidden"]), textarea, select',
            )
            // Only trust this container's text if it wraps just this one
            // visible field — otherwise we'd grab neighboring fields' labels too.
            if (realInputs.length === 1) {
                const clone = container.cloneNode(true)
                clone
                    .querySelectorAll('input, textarea, select, script, style, .hidden, .mError')
                    .forEach(n => n.remove())
                text += ' ' + clone.innerText
                container = container.parentElement
                hops++
            } else {
                break // container has multiple fields, stop climbing
            }
        }

        return text
    }

    // Returns { rule, lang } for the first rule that matches, where lang
    // is 'en' or 'pt-br' depending on which keyword list matched. Returns
    // null if nothing matches.
    function matchRule(labelText) {
        for (const rule of FIELD_RULES) {
            if (rule.enKeys.some(k => labelText.includes(k))) return { rule, lang: 'en' }
            if (rule.ptBrKeys.some(k => labelText.includes(k))) return { rule, lang: 'pt-br' }
        }
        return null
    }

    // A profile value can be a plain string or a { en, pt-br } object.
    // Picks the value for the detected language, falling back sensibly.
    function localizedValue(rawValue, lang) {
        if (rawValue == null) return ''
        if (typeof rawValue === 'object') {
            return rawValue[lang] || rawValue.en || rawValue['pt-br'] || rawValue.default || ''
        }
        return rawValue
    }

    function setNativeValue(el, value) {
        const proto =
            el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
        const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set
        if (setter) setter.call(el, value)
        else el.value = value
        el.dispatchEvent(new Event('input', { bubbles: true }))
        el.dispatchEvent(new Event('change', { bubbles: true }))
    }

    // ------------------------------------------------------------------
    // 4. Main fill routine — only touches empty fields, never overwrites
    //    something you already typed.
    // ------------------------------------------------------------------
    function autofill() {
        const profile = getProfile()
        const fields = document.querySelectorAll('input, textarea, select')
        let filled = 0

        fields.forEach(el => {
            if (
                el.type === 'hidden' ||
                el.type === 'file' ||
                el.type === 'checkbox' ||
                el.type === 'radio'
            )
                return
            if (el.disabled || el.readOnly) return
            if (el.value && el.value.trim() !== '') return // don't clobber existing input

            const labelText = getFieldLabelText(el)
            const match = matchRule(labelText)
            if (!match) return

            const { rule, lang } = match
            const value = localizedValue(getByPath(profile, rule.path), lang)
            if (!value) return

            if (el.tagName === 'SELECT') {
                const option = Array.from(el.options).find(o =>
                    o.textContent.toLowerCase().includes(value.toLowerCase()),
                )
                if (option) {
                    el.value = option.value
                    el.dispatchEvent(new Event('change', { bubbles: true }))
                    filled++
                }
            } else {
                setNativeValue(el, value)
                filled++
            }
        })

        showToast(
            `Autofilled ${filled} field${filled === 1 ? '' : 's'}. Resume/file uploads still need to be attached manually.`,
        )
    }

    function showToast(msg) {
        const toast = document.createElement('div')
        toast.textContent = msg
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            zIndex: 999999,
            background: '#222',
            color: '#fff',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontFamily: 'sans-serif',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            maxWidth: '280px',
        })
        document.body.appendChild(toast)
        setTimeout(() => toast.remove(), 4000)
    }

    // ------------------------------------------------------------------
    // 5. Floating "Autofill" button
    // ------------------------------------------------------------------
    function addButton() {
        if (document.getElementById('cv-autofill-btn')) return
        const btn = document.createElement('button')
        btn.id = 'cv-autofill-btn'
        btn.textContent = 'Autofill'
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 999999,
            padding: '10px 16px',
            background: '#4a56e2',
            color: '#fff',
            border: 'none',
            borderRadius: '24px',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            fontFamily: 'sans-serif',
        })
        btn.addEventListener('click', autofill)
        document.body.appendChild(btn)
    }

    window.addEventListener('load', addButton)
    setTimeout(addButton, 1500) // catch pages that build the form async
})()
