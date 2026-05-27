'use client'

import { useState } from 'react'
import { Modal, Image as BsImage, ModalProps } from 'react-bootstrap'
import UnstyledButton from './UnstyledButton'

export default function ImageModal({
    src,
    alt = '',
    children,
    ...props
}: ModalProps & { src: string; alt: string; children: React.ReactNode }) {
    const [show, setShow] = useState(false)

    return (
        <>
            <div onClick={() => setShow(true)}>{children}</div>
            <Modal centered show={show} onHide={() => setShow(false)} {...props}>
                <BsImage thumbnail src={src} alt={alt} />
                <UnstyledButton
                    style={{
                        top: 'var(--bs-border-width)',
                        right: 'var(--bs-border-width)',
                        borderTopRightRadius: 'var(--bs-border-radius)',
                        borderBottomLeftRadius: 'var(--bs-border-radius)',
                        background: 'inherit',
                    }}
                    className="position-absolute"
                    onClick={() => setShow(false)}
                >
                    <BsImage
                        src="/img/icons/x.svg"
                        alt="Close"
                        fluid
                        className="m-2"
                        style={{ width: '1rem' }}
                    />
                </UnstyledButton>
            </Modal>
        </>
    )
}
