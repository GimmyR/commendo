import { Alert, Button, Form, Modal, Stack } from "react-bootstrap";
import SignInInputGroup from "./sign-in-input-group";
import useSignInModal from "../../../../libs/hooks/use-sign-in-modal";
import { signIn } from "../../../../libs/actions/account";

type Props = {
    isShown: boolean;
    close: () => void;
};

export default function SignInModal({ isShown, close } : Props) {
    const {account, error, setUsername, setPassword, resetAccount, setError} = useSignInModal();

    const handleSignIn = async () => {
        setError(undefined);
        try {
            const result = await signIn(account);
            console.log(result);
        } catch(error) {
            setError(error.message);
        }
    };

    const handleClose = () => {
        close();
        setTimeout(() => {
            resetAccount();
            setError(undefined);
        }, 200);
    };

    return (
        <Modal show={isShown} onHide={handleClose} centered>
            <Modal.Body className="py-5">
                <Stack direction="vertical" className="align-items-center pb-3">
                    <h1 className="text-center fs-4 mb-4">Connexion</h1>
                    {error && <Alert variant="danger" className="col-10 col-md-8 mb-4 py-1 rounded-0">{error}</Alert>}
                    <Form className="col-10 col-md-8">
                        <SignInInputGroup icon="person" type="text" value={account.username} onChange={setUsername} placeholder="Nom d'utilisateur"/>
                        <SignInInputGroup icon="lock" type="password" value={account.password} onChange={setPassword} placeholder="Mot de passe"/>
                        <Button onClick={handleSignIn} variant="success" className="col-12 mt-2 rounded-0">Se connecter</Button>
                    </Form>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}