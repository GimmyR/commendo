import type { SubmitEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props = {
    show: boolean;
    onCancel: () => void;
    onConfirm: (e: SubmitEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
};

export default function ConfirmModal({ show, onCancel, onConfirm, children } : Props) {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Body>
                <div>
                    <p className="text-center">{children}</p>
                </div>
                <Form onSubmit={onConfirm}>
                    <Form.Group className="d-flex flex-row justify-content-center">
                        <div className="col-3 pe-1">
                            <Button variant="secondary" className="col-12" onClick={onCancel}>No</Button>
                        </div>
                        <div className="col-3 ps-1">
                            <Button type="submit" variant="danger" className="col-12">Yes</Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}