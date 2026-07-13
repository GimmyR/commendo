import { Dropdown } from "react-bootstrap";
import UserButtonMenu from "./user-button-menu";

export default function UserButton() {
    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" className="user-btn cmd-btn border-0 p-0">
                <i className="bi bi-person-circle"></i>
            </Dropdown.Toggle>
            <UserButtonMenu/>
        </Dropdown>
    );
}