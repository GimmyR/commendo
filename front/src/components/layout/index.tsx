import { Container } from "react-bootstrap";
import { Outlet, useMatch } from "react-router-dom";
import NavigationBar from "../navigation-bar";
import SignedIn from "@/components/signed-in";
import SignedOut from "@/components/signed-out";
import Error from "@/components/error";

export default function Layout() {
    const match = useMatch("/");

    return (
        <>
            <NavigationBar/>
            <Container fluid className="pt-4 pt-lg-5">
                {match ? (
                    <Outlet/>
                ) : (
                    <>
                        <SignedIn>
                            <Outlet/>
                        </SignedIn>
                        <SignedOut>
                            <Error>Forbidden</Error>
                        </SignedOut>
                    </>
                )}
            </Container>
        </>
    );
}