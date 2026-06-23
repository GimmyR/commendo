import { useAuth } from "@/libs/hooks/use-auth";
import { Button, Modal } from "react-bootstrap";

type Props = {
    isShown: boolean;
    close: () => void;
};

export default function SignOutModal({ isShown, close } : Props) {
    const logout = useAuth((state) => state.logout);

    const confirm = () => {
        close();
        setTimeout(() => {
            logout();
        }, 200);
    };

    return (
        <Modal show={isShown} onHide={close}>
            <Modal.Body className="text-center">
                Tu es sûr de vouloir te déconnecter ?
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={close} className="col-5">Annuler</Button>
                <Button variant="danger" onClick={confirm} className="col-5">Confirmer</Button>
            </Modal.Footer>
        </Modal>
    );
}