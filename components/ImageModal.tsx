'use client'

import { useState } from 'react'
import { Modal, Image as BsImage, ModalProps } from 'react-bootstrap'

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
                <BsImage
                    thumbnail
                    src={src}
                    alt={alt}
                    style={{ maxWidth: '80vw', maxHeight: '80vh' }}
                />
            </Modal>
        </>
    )
}
