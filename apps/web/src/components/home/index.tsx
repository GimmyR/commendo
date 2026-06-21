import type { LanguageItem } from "@repo/shared";
import { Button, Col, Container, Row } from "react-bootstrap";
import Languages from "./languages";

export default function Home() {
    const languages: LanguageItem[] = [
        { id: 1, name: "English", abbrev: "eng" }
    ];

    return (
        <Container fluid className="pt-3">
            <Row>
                <Col>
                    <Languages languages={languages}/>
                    <Button variant="primary">Hello !</Button>
                </Col>
            </Row>
        </Container>
    );
}