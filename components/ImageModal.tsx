'use client'

import { CSSProperties, useEffect, useState } from 'react'
import { Modal, Image as BsImage, ModalProps } from 'react-bootstrap'
import UnstyledButton from './UnstyledButton'

export default function ImageModal({
    src,
    alt = '',
    children,
    ...props
}: ModalProps & { src: string; alt: string; children: React.ReactNode }) {
    const [show, setShow] = useState(false)

    useEffect(function addModalContentClickCloseEvent() {
        const modalContent = document.querySelector('.modal-content')

        modalContent?.addEventListener('click', e => {
            if (e.target === e.currentTarget) {
                setShow(false)
            }
        })
    }, [show])

    function handleOpen() {
        setShow(true)
    }

    return (
        <>
            <div onClick={handleOpen}>{children}</div>
            <Modal
                centered
                show={show}
                onHide={() => setShow(false)}
                className="d-flex justify-content-center p-0"
                dialogClassName="image-modal-size justify-content-center align-items-stretch"
                contentClassName="w-auto bg-transparent border-0 justify-content-center align-items-center"
                {...props}
            >
                <div className="mw-100 mh-100 position-relative">
                    <BsImage fluid thumbnail className="mh-100" src={src} alt={alt} />
                    <UnstyledButton
                        style={{
                            top: 'var(--bs-border-width)',
                            right: 'var(--bs-border-width)',
                            borderTopRightRadius: 'var(--bs-border-radius)',
                            borderBottomLeftRadius: 'var(--bs-border-radius)',
                            background: 'var(--bs-body-bg)',
                        }}
                        className="position-absolute"
                        onClick={() => setShow(false)}
                    >
                        <BsImage
                            src="/img/icons/x.svg"
                            alt="Close"
                            aria-label="Close"
                            fluid
                            className="m-2"
                            style={{ width: '1rem' }}
                        />
                    </UnstyledButton>
                </div>
            </Modal>
        </>
    )
}
