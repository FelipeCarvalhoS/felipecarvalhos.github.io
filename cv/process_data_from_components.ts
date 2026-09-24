import { dataFromComponents as unprocessedCvDataFromComponents } from '@/cv/temporary/template'
import { routing } from '@/i18n/routing'
import { createTranslator } from 'use-intl'
import en_messages from '@/messages/en.json'
import pt_br_messages from '@/messages/pt-br.json'
import fs from 'fs'
import path from 'path'
import { cv } from '@/cv/cv'
import { toBulletPoints } from '@/utils'

const messages = {
    en: en_messages,
    'pt-br': pt_br_messages,
}

function* walkAll(obj: unknown, path: string[] = []): Generator<[string[], unknown]> {
    yield [path, obj]
    if (obj !== null && typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
            yield* walkAll(value, [...path, key])
        }
    }
}

function setByPath(obj: any, path: string | string[], value: unknown): void {
    const keys = Array.isArray(path) ? path : path.split('.')
    let current = obj

    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
        if (current === null || typeof current !== 'object') {
            throw new Error(`Path breaks at "${keys[i]}"`)
        }
    }

    current[keys[keys.length - 1]] = value
}

function localize(unprocessedMessage: string) {
    const [, namespace, methodName, messageKey] = unprocessedMessage.split('!')
    const localized = {}

    for (const locale of routing.locales) {
        const translator = createTranslator({
            locale: locale,
            messages: messages[locale],
        })
        const translateMethod =
            methodName === '' ? translator : translator[methodName as keyof typeof translator]

        let translated = translateMethod(namespace + '.' + messageKey)

        if (methodName === 'raw') {
            translated = toBulletPoints(translated)
        }

        localized[locale] = translated
    }

    return localized
}

function createJsonFile(obj: unknown, filename: string) {
    const filePath = path.join(filename)
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 4))
}

function createFullCvFile() {
    for (const [path, value] of walkAll(unprocessedCvDataFromComponents)) {
        if (typeof value === 'string' && value.startsWith('MESSAGEKEY!')) {
            const localized = localize(value)

            setByPath(unprocessedCvDataFromComponents, path, localized)
        }
    }

    const fullCv = { ...cv, ...unprocessedCvDataFromComponents }
    createJsonFile(fullCv, path.join(__dirname, 'temporary', 'fullCv.json'))
}

createFullCvFile()
