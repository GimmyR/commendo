import Error from "@/components/error";
import OrdersTable from "@/components/orders/table";
import SignedIn from "@/components/signed-in";
import SignedOut from "@/components/signed-out";
import useOrders from "@/libs/hooks/use-orders";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Orders() {
    const {orders, loading, changeStatus} = useOrders();

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <>
            <SignedIn>
                <Row className="justify-content-center pt-5 px-2 px-lg-5">
                    <Col className="col-12 col-lg-7 col-xxl-5">
                        <OrdersTable orders={orders} changeStatus={changeStatus}/>
                    </Col>
                </Row>
            </SignedIn>
            <SignedOut>
                <Error>FORBIDDEN</Error>
            </SignedOut>
        </>
    );
}