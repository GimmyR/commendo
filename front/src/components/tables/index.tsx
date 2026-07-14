import SignedIn from "@/components/signed-in";
import SignedOut from "@/components/signed-out";
import { Col, Row } from "react-bootstrap";

export default function Tables() {
    return (
        <>
            <SignedIn>
                <Row className="pt-5">
                    <Col>
                        List of tables
                    </Col>
                </Row>
            </SignedIn>
            <SignedOut>
                <Row className="pt-5">
                    <Col className="text-danger">
                        FORBIDDEN
                    </Col>
                </Row>
            </SignedOut>
        </>
    );
}