import { Dropdown } from "react-bootstrap";
import SignInButton from "./sign-in-button";
import SignedOut from "@/components/signed-out";
import SignedIn from "@/components/signed-in";
import SignOutButton from "@/components/navigation-bar/user-button/sign-out-button";
import { useTranslation } from "react-i18next";

export default function UserButtonMenu() {
    const { t } = useTranslation("navbar");

    return (
        <Dropdown.Menu>
            <SignedIn>
                <Dropdown.Item className="text-center">{t("settings")}</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item className="cmd-dropdown-item">
                    <SignOutButton/>
                </Dropdown.Item>
            </SignedIn>
            <SignedOut>
                <Dropdown.Item className="cmd-dropdown-item">
                    <SignInButton/>
                </Dropdown.Item>
            </SignedOut>
        </Dropdown.Menu>
    );
}