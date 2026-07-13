import { Button } from "react-bootstrap";
import useSignInButton from "@/libs/hooks/use-sign-in-button";
import SignInModal from "./sign-in-modal";
import { useTranslation } from "react-i18next";

export default function SignInButton() {
    const {isShown, showSignIn, closeSignIn} = useSignInButton();
    const { t } = useTranslation("userButtonMenu");

    return (
        <>
            <Button variant="success" onClick={showSignIn} className="col-12">{t("sign-in")}</Button>
            <SignInModal isShown={isShown} close={closeSignIn}/>
        </>
    );
}