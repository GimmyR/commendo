import { Dropdown } from "react-bootstrap";
import LanguageSelect from "./language-select";
import SignInButton from "./sign-in-button";
import SignedOut from "@/components/signed-out";
import SignedIn from "@/components/signed-in";
import SignOutButton from "@/components/navigation-bar/user-button/sign-out-button";
import { useTranslation } from "react-i18next";

export default function UserButtonMenu() {
    const { t } = useTranslation("userButtonMenu");

    return (
        <Dropdown.Menu>
            <Dropdown.Item className="cmd-dropdown-item" onClick={(e) => e.stopPropagation()}>
                <LanguageSelect/>
            </Dropdown.Item>
            <SignedIn>
                <Dropdown.Divider/>
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