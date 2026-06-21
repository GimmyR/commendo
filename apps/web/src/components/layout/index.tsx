import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Menu from "../menu";
import NavigationBar from "../navigation-bar";

export default function Layout() {
    return (
        <>
            <NavigationBar/>
            <Menu/>
            <Container fluid>
                <Outlet/>
            </Container>
        </>
    );
}