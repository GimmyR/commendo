import { Container, Navbar, Stack } from "react-bootstrap";
import IconLink from "../icon-link";
import "./navbar.css";
import UserButton from "./user-button";
import SignedIn from "@/components/signed-in";
import Menu from "@/components/menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import LangButton from "@/components/navigation-bar/lang-button";

export default function NavigationBar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const handleClose = () => setShowMenu(false);
    const handleShow = () => setShowMenu(true);

    return (
        <>
            <Navbar className="bg-success fixed-top">
                <Container fluid className="justify-content-between">
                    <Stack direction="horizontal" gap={2}>
                        <SignedIn>
                            <IconLink to="#" icon="list" linkClass="text-light" iconClass="fs-3" onClick={handleShow}/>
                        </SignedIn>
                        <Navbar.Brand className="text-light fw-bold">
                            <Link to="/" className="text-light text-decoration-none">Commendo</Link>
                        </Navbar.Brand>
                    </Stack>
                    <Stack direction="horizontal" gap={1}>
                        <LangButton/>
                        <UserButton/>
                    </Stack>
                </Container>
            </Navbar>
            <Menu show={showMenu} onHide={handleClose}/>
        </>
    );
}