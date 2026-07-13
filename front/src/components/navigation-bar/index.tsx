import { Container, Navbar, Stack } from "react-bootstrap";
import IconLink from "../icon-link";
import "./navbar.css";
import LargeSearchButton from "./large-search-button";
import UserButton from "./user-button";
import SignedIn from "@/components/signed-in";
import Menu from "@/components/menu";
import useNavigationBar from "@/libs/hooks/use-navigation-bar";
import { useSearch } from "@/libs/hooks/use-search";

export default function NavigationBar() {
    const {show, handleShow, handleClose} = useNavigationBar();
    const setShow = useSearch((state) => state.setShow);
    const handleShowSearchModal = () => setShow(true);

    return (
        <>
            <Navbar className="bg-success fixed-top">
                <Container fluid className="justify-content-between">
                    <Stack direction="horizontal" gap={2}>
                        <SignedIn>
                            <IconLink to="#" icon="list" iconClass="fs-3" onClick={handleShow}/>
                        </SignedIn>
                        <Navbar.Brand className="text-light fw-bold">Commendo</Navbar.Brand>
                    </Stack>
                    <LargeSearchButton onClick={handleShowSearchModal}/>
                    <Stack direction="horizontal" gap={3}>
                        <IconLink to="#" onClick={handleShowSearchModal} icon="search" linkClass="d-inline d-md-none" iconClass="cmd-btn fs-5"/>
                        <UserButton/>
                    </Stack>
                </Container>
            </Navbar>
            <Menu show={show} onHide={handleClose}/>
        </>
    );
}