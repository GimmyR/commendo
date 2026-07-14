import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavigationBar from "../navigation-bar";

export default function Layout() {
    return (
        <>
            <NavigationBar/>
            <Container fluid className="pt-4 pt-lg-5">
                <Outlet/>
            </Container>
        </>
    );
}