import { Button, Col, Container, Row } from "react-bootstrap";

export default function Home() {
    return (
        <Container fluid className="pt-3">
            <Row>
                <Col>
                    <Button variant="primary">Hello !</Button>
                </Col>
            </Row>
        </Container>
    );
}