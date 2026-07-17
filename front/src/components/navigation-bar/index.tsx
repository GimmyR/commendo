import { Container, Navbar, Stack } from "react-bootstrap";
import IconLink from "../icon-link";
import "./navbar.css";
import LargeSearchButton from "./large-search-button";
import UserButton from "./user-button";
import SignedIn from "@/components/signed-in";
import Menu from "@/components/menu";
import { useSearch } from "@/libs/hooks/use-search";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const handleClose = () => setShowMenu(false);
    const handleShow = () => setShowMenu(true);
    const setShowSearchModal = useSearch((state) => state.setShow);
    const handleShowSearchModal = () => setShowSearchModal(true);

    return (
        <>
            <Navbar className="bg-success fixed-top">
                <Container fluid className="justify-content-between">
                    <Stack direction="horizontal" gap={2}>
                        <SignedIn>
                            <IconLink to="#" icon="list" iconClass="fs-3" onClick={handleShow}/>
                        </SignedIn>
                        <Navbar.Brand className="text-light fw-bold">
                            <Link to="/" className="text-light text-decoration-none">Commendo</Link>
                        </Navbar.Brand>
                    </Stack>
                    <LargeSearchButton onClick={handleShowSearchModal}/>
                    <Stack direction="horizontal" gap={3}>
                        <IconLink to="#" onClick={handleShowSearchModal} icon="search" linkClass="d-inline d-md-none" iconClass="cmd-btn fs-5"/>
                        <UserButton/>
                    </Stack>
                </Container>
            </Navbar>
            <Menu show={showMenu} onHide={handleClose}/>
        </>
    );
}