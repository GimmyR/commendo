import { Button, Form, Modal, Stack } from "react-bootstrap";
import SignInInputGroup from "./sign-in-input-group";
import useSignInModal from "../../../../libs/hooks/use-sign-in-modal";
import type { SubmitEvent } from "react";

type Props = {
    isShown: boolean;
    close: () => void;
};

export default function SignInModal({ isShown, close } : Props) {
    const {account, setUsername, setPassword, resetAccount} = useSignInModal();

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(account);
    };

    const handleClose = () => {
        close();
        setTimeout(() => {
            resetAccount();
        }, 200);
    };

    return (
        <Modal show={isShown} onHide={handleClose} centered>
            <Modal.Body className="py-5">
                <Stack direction="vertical" className="align-items-center pb-3" gap={3}>
                    <h1 className="text-center fs-4">Connexion</h1>
                    <Form onSubmit={handleSubmit} className="col-10 col-md-8">
                        <SignInInputGroup icon="person" type="text" value={account.username} onChange={setUsername} placeholder="Nom d'utilisateur"/>
                        <SignInInputGroup icon="lock" type="password" value={account.password} onChange={setPassword} placeholder="Mot de passe"/>
                        <Button type="submit" variant="success" className="col-12 mt-1 rounded-0">Se connecter</Button>
                    </Form>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}