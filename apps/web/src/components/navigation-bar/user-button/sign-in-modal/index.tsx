import { Alert, Button, Form, Modal, Spinner, Stack } from "react-bootstrap";
import SignInInputGroup from "./sign-in-input-group";
import { signIn } from "@/libs/actions/account";
import useSignInModal from "@/libs/hooks/use-sign-in-modal";

type Props = {
    isShown: boolean;
    close: () => void;
};

export default function SignInModal({ isShown, close } : Props) {
    const { credentials, error, submitting, setUsername, setPassword, resetAccount, setError, login, setSubmitting } = useSignInModal();

    const handleSignIn = async () => {
        setSubmitting(true);
        setError(undefined);
        
        try {
            const result = await signIn(credentials);
            login(result.access_token);
            handleClose();
        } catch(error: any) {
            setError(error.message);
        } finally {
            setSubmitting(false);
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
                        <SignInInputGroup icon="person" type="text" value={credentials.username} onChange={setUsername} placeholder="Nom d'utilisateur"/>
                        <SignInInputGroup icon="lock" type="password" value={credentials.password} onChange={setPassword} placeholder="Mot de passe"/>
                        <Button onClick={handleSignIn} variant="success" className="col-12 mt-2 rounded-0">
                            {submitting ? <Spinner size="sm"/> : "Se connecter"}
                        </Button>
                    </Form>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}