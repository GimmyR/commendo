import Error from "@/components/error";
import OrdersTable from "@/components/orders/table";
import SignedIn from "@/components/signed-in";
import SignedOut from "@/components/signed-out";
import { sortOrders } from "@/libs/actions/orders";
import useOrders from "@/libs/hooks/use-orders";
import { useMemo } from "react";
import { Accordion, Col, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Orders() {
    const {orders, loading, changeStatus} = useOrders();
    const [trueOrders, others] = useMemo(() => sortOrders(orders), [orders]);
    const {t} = useTranslation("orders");

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <>
            <SignedIn>
                <Row className="justify-content-center pt-5 px-2 px-lg-5">
                    <Col className="col-12 col-lg-7 col-xxl-5">
                        <div className="mt-3 mb-5">
                            <h1 className="text-center text-decoration-underline fs-5 mb-4">{t("current-orders")}</h1>
                            <OrdersTable orders={trueOrders} changeStatus={changeStatus}/>
                        </div>
                        <Accordion>
                            <Accordion.Item eventKey="0" className="rounded-0">
                                <Accordion.Header>{t("others")}</Accordion.Header>
                                <Accordion.Body>
                                    <OrdersTable orders={others} changeStatus={changeStatus}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </SignedIn>
            <SignedOut>
                <Error>FORBIDDEN</Error>
            </SignedOut>
        </>
    );
}