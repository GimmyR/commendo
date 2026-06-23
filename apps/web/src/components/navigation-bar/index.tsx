import { Container, Navbar, Stack } from "react-bootstrap";
import IconLink from "../icon-link";
import "./navbar.css";
import LargeSearchButton from "./large-search-button";
import UserButton from "./user-button";
import SignedIn from "@/components/signed-in";
import Menu from "@/components/menu";
import useNavigationBar from "@/libs/hooks/use-navigation-bar";

export default function NavigationBar() {
    const {show, handleShow, handleClose} = useNavigationBar();

    return (
        <>
            <Navbar className="bg-success">
                <Container fluid className="justify-content-between">
                    <Stack direction="horizontal" gap={2}>
                        <SignedIn>
                            <IconLink to="#" icon="list" iconClass="fs-3" onClick={handleShow}/>
                        </SignedIn>
                        <Navbar.Brand className="text-light fw-bold">Commendo</Navbar.Brand>
                    </Stack>
                    <LargeSearchButton/>
                    <Stack direction="horizontal" gap={3}>
                        <IconLink to="#" icon="search" linkClass="d-inline d-md-none" iconClass="cmd-btn fs-5"/>
                        <UserButton/>
                    </Stack>
                </Container>
            </Navbar>
            <Menu show={show} onHide={handleClose}/>
        </>
    );
}