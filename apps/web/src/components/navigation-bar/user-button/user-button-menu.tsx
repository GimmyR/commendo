import { Button, Dropdown } from "react-bootstrap";
import LanguageSelect from "./language-select";

export default function UserButtonMenu() {
    return (
        <Dropdown.Menu>
            <Dropdown.Item className="cmd-dropdown-item">
                <LanguageSelect/>
            </Dropdown.Item>
            <Dropdown.Item className="cmd-dropdown-item">
                <Button variant="success" className="col-12">Connexion</Button>
            </Dropdown.Item>
        </Dropdown.Menu>
    );
}