import TablesList from "@/components/tables/list";
import useTables from "@/libs/hooks/use-tables";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Tables() {
    const {tables, loading} = useTables();

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <Row className="justify-content-center pt-5">
            <Col className="col-12 col-xxl-8">
                <TablesList tables={tables}/>
            </Col>
        </Row>
    );
}