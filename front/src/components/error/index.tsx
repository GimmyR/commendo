import { Col, Row } from "react-bootstrap";

type Props = {
    children: React.ReactNode;
};

export default function Error({ children } : Props) {
    return (
        <Row className="pt-5">
            <Col className="text-danger">
                {children}
            </Col>
        </Row>
    );
}