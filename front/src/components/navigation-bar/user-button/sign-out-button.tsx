import SignOutModal from "@/components/navigation-bar/user-button/sign-out-modal";
import useSignOutButton from "@/libs/hooks/use-sign-out-button";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function SignOutButton() {
    const {isShown, showSignOut, closeSignOut} = useSignOutButton();
        const { t } = useTranslation("userButtonMenu");

    return (
        <>
            <Button variant="danger" onClick={showSignOut} className="col-12">{t("sign-out")}</Button>
            <SignOutModal isShown={isShown} close={closeSignOut}/>
        </>
    );
}