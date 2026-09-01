import type { SubmitEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props = {
    show: boolean;
    onHide: () => void;
};

export default function AddIngredientModal({ show, onHide } : Props) {
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("ADD INGREDIENT");
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                Add ingredient
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Lorem ipsum"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control type="text" placeholder="g"/>
                    </Form.Group>
                    <Form.Group className="d-flex flex-row justify-content-end">
                        <Button type="button" variant="secondary" className="me-2" onClick={onHide}>Cancel</Button>
                        <Button type="submit" variant="success">Save</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}