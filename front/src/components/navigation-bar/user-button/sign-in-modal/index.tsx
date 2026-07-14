import { Alert, Button, Form, Modal, Spinner, Stack } from "react-bootstrap";
import SignInInputGroup from "./sign-in-input-group";
import { signIn, type SignIn } from "@/libs/actions/account";
import { useTranslation } from "react-i18next";
import { useState, type ChangeEvent } from "react";
import { useAuth } from "@/libs/hooks/use-auth";

type Props = {
    isShown: boolean;
    close: () => void;
};

const credentialsPlaceholder: SignIn = { username: "", password: "" };

export default function SignInModal({ isShown, close } : Props) {
    const { t } = useTranslation("signInModal");
    const [credentials, setCredentials] = useState<SignIn>(credentialsPlaceholder);
    const [error, setError] = useState<string | undefined>();
    const login = useAuth((state) => state.login);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, username: event.target.value})
    };

    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, password: event.target.value})
    };

    const resetAccount = () => {
        setCredentials({...credentialsPlaceholder});
    };

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
                    <h1 className="text-center fs-4 mb-4">{t("login")}</h1>
                    {error && <Alert variant="danger" className="col-10 col-md-8 mb-4 py-1 rounded-0">{error}</Alert>}
                    <Form className="col-10 col-md-8">
                        <SignInInputGroup icon="person" type="text" value={credentials.username} onChange={setUsername} placeholder={t("username")}/>
                        <SignInInputGroup icon="lock" type="password" value={credentials.password} onChange={setPassword} placeholder={t("password")}/>
                        <Button onClick={handleSignIn} variant="success" className="col-12 mt-2 rounded-0">
                            {submitting ? <Spinner size="sm"/> : t("sign-in")}
                        </Button>
                    </Form>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}