import { Button } from "react-bootstrap";
import useSignInButton from "../../../libs/hooks/use-sign-in-button";
import SignInModal from "./sign-in-modal";

export default function SignInButton() {
    const {isShown, showSignIn, closeSignIn} = useSignInButton();

    return (
        <>
            <Button variant="success" onClick={showSignIn} className="col-12">Connexion</Button>
            <SignInModal isShown={isShown} close={closeSignIn}/>
        </>
    );
}