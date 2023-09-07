import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
export default function Alert({ title, body, show, setShow, navigateTo, variant }) {
    const navigate = useNavigate();
    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant={variant} onClick={() => {
                    if (navigateTo) {
                        navigate(navigateTo)
                    } else {
                        setShow(false);
                    }
                }}>Close</Button>
            </Modal.Footer>
        </Modal>

    )
}