import Error from "@/components/error";
import SignedIn from "@/components/signed-in";
import SignedOut from "@/components/signed-out";
import OrdersTable from "@/components/tables/unique/orders-table";
import OrdersTotal from "@/components/tables/unique/orders-total";
import TableRef from "@/components/tables/unique/table-ref";
import useTable from "@/libs/hooks/use-table";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

type Props = {
    id: string;
};

export default function UniqueTable() {
    const { id } = useParams<Props>();
    const {table, loading} = useTable(parseInt(id as string));
    const {t} = useTranslation("table");

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <>
            <SignedIn>
                <Row className="pt-5 px-3 px-lg-5">
                    {table && <Col>
                        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                            <TableRef reference={table.tableRef}/>
                            <OrdersTotal orders={table.orders}/>
                        </div>
                        <OrdersTable orders={table.orders}/>
                        <div className="d-flex flex-column flex-lg-row pt-2">
                            {table.availability == 1 && <Button variant="success" className="rounded-0">
                                <i className="bi bi-calendar-fill me-2"></i>{t("book-table")}
                            </Button>}
                        </div>
                        {table.availability == 2 && <Button variant="success" className="position-absolute bottom-0 end-0 me-3 mb-3 pe-lg-3">
                            <i className="bi bi-plus-lg me-0 me-lg-1"></i>
                            <span className="d-none d-lg-inline">{t("add-order")}</span>
                        </Button>}
                    </Col>}
                </Row>
            </SignedIn>
            <SignedOut>
                <Error>Forbidden</Error>
            </SignedOut>
        </>
    );
}