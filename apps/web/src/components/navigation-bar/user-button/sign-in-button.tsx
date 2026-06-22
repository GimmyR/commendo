import { Button } from "react-bootstrap";
import LoginModal from "./sign-in-modal";
import useSignInButton from "../../../libs/hooks/use-sign-in-button";

export default function SignInButton() {
    const {isShown, showSignIn, closeSignIn} = useSignInButton();

    return (
        <>
            <Button variant="success" onClick={showSignIn} className="col-12">Connexion</Button>
            <LoginModal isShown={isShown} close={closeSignIn}/>
        </>
    );
}