import { Dropdown } from "react-bootstrap";
import LanguageSelect from "./language-select";
import SignInButton from "./sign-in-button";

export default function UserButtonMenu() {
    return (
        <Dropdown.Menu>
            <Dropdown.Item className="cmd-dropdown-item">
                <LanguageSelect/>
            </Dropdown.Item>
            <Dropdown.Item className="cmd-dropdown-item">
                <SignInButton/>
            </Dropdown.Item>
        </Dropdown.Menu>
    );
}