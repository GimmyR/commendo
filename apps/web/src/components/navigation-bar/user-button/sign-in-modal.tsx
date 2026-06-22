import { Modal } from "react-bootstrap";

type Props = {
    isShown: boolean;
    close: () => void;
};

export default function LoginModal({ isShown, close } : Props) {
    return (
        <Modal show={isShown} onHide={close} centered>
            <Modal.Body>
                Login
            </Modal.Body>
        </Modal>
    );
}