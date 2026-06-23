import SignOutModal from "@/components/navigation-bar/user-button/sign-out-modal";
import useSignOutButton from "@/libs/hooks/use-sign-out-button";
import { Button } from "react-bootstrap";

export default function SignOutButton() {
    const {isShown, showSignOut, closeSignOut} = useSignOutButton();

    return (
        <>
            <Button variant="danger" onClick={showSignOut} className="col-12">Déconnexion</Button>
            <SignOutModal isShown={isShown} close={closeSignOut}/>
        </>
    );
}