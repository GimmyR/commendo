import { Container, Navbar, Stack } from "react-bootstrap";
import IconLink from "../icon-link";
import "./navbar.css";
import LargeSearchButton from "./large-search-button";
import UserButton from "./user-button";

export default function NavigationBar() {
    return (
        <Navbar className="bg-success">
            <Container fluid className="justify-content-between">
                <Navbar.Brand className="text-light fw-bold">Commendo</Navbar.Brand>
                <LargeSearchButton/>
                <Stack direction="horizontal" gap={3}>
                    <IconLink to="#" icon="search" linkClass="d-inline d-md-none" iconClass="cmd-btn fs-5"/>
                    <UserButton/>
                </Stack>
            </Container>
        </Navbar>
    );
}