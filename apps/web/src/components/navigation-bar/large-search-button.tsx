import { Button } from "react-bootstrap";

export default function LargeSearchButton() {
    return (
        <Button variant="outline-light" className="d-none d-md-inline col-md-5 col-lg-4 me-4 text-start rounded-5 cmd-btn">
            <i className="bi bi-search me-2"></i>Rechercher
        </Button>
    );
}