import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import Menu from "../menu";

export default function Layout() {
    return (
        <>
            <Navbar/>
            <Menu/>
            <Container fluid>
                <Outlet/>
            </Container>
        </>
    );
}