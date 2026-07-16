import { Button } from "react-bootstrap";
import SignInModal from "./sign-in-modal";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function SignInButton() {
    const { t } = useTranslation("navbar");
    const [isShown, setIsShown] = useState(false);

    const showSignIn = () => {
        setIsShown(true);
    };

    const closeSignIn = () => {
        setIsShown(false);
    };

    return (
        <>
            <Button variant="success" onClick={showSignIn} className="col-12">{t("sign-in")}</Button>
            <SignInModal isShown={isShown} close={closeSignIn}/>
        </>
    );
}