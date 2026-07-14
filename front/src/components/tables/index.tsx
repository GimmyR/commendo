import Error from "@/components/error";
import SignedIn from "@/components/signed-in";
import SignedOut from "@/components/signed-out";
import TablesTable from "@/components/tables/table";
import useTables from "@/libs/hooks/use-tables";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Tables() {
    const {tables, loading} = useTables();

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <>
            <SignedIn>
                <Row className="justify-content-center pt-5">
                    <Col className="col-12 col-lg-6 col-xl-5 col-xxl-4">
                        <TablesTable tables={tables}/>
                    </Col>
                </Row>
            </SignedIn>
            <SignedOut>
                <Error>FORBIDDEN</Error>
            </SignedOut>
        </>
    );
}