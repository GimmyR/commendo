import { Button } from "react-bootstrap";

export default function LargeSearchButton() {
    return (
        <Button variant="outline-light" className="d-none d-lg-inline col-3 text-start rounded-5 cmd-btn">
            <i className="bi bi-search me-2"></i>Search
        </Button>
    );
}