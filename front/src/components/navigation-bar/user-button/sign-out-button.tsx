import SignOutModal from "@/components/navigation-bar/user-button/sign-out-modal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function SignOutButton() {
    const { t } = useTranslation("navbar");
    const [isShown, setIsShown] = useState(false);

    const showSignOut = () => {
        setIsShown(true);
    };

    const closeSignOut = () => {
        setIsShown(false);
    };

    return (
        <>
            <Button variant="danger" onClick={showSignOut} className="col-12">{t("sign-out")}</Button>
            <SignOutModal isShown={isShown} close={closeSignOut}/>
        </>
    );
}