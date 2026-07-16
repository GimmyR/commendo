import Error from "@/components/error";
import SignedIn from "@/components/signed-in";
import SignedOut from "@/components/signed-out";
import DishesModal from "@/components/tables/unique/dishes-modal";
import TableOrdersTable from "@/components/tables/unique/orders-table";
import TableRef from "@/components/tables/unique/table-ref";
import { disableSaveOrder } from "@/libs/actions/orders";
import useTable from "@/libs/hooks/use-table";
import { useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

type Props = {
    id: string;
};

export default function UniqueTable() {
    const { id } = useParams<Props>();
    const {table, loading, bookTable, freeTable, addOrder, deleteOrder, confirmOrders} = useTable(parseInt(id as string));
    const {t} = useTranslation("table");
    const [showDishesModal, setShowDishesModal] = useState<boolean>(false);

    const handleShowDishesModal = () => setShowDishesModal(true);
    const handleHideDishesModal = () => setShowDishesModal(false);

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <>
            <SignedIn>
                <Row className="pt-5 px-3 px-lg-5">
                    {table && <Col>
                        <div className="d-flex flex-row justify-content-start align-items-center mb-4">
                            <TableRef reference={table.tableRef}/>
                        </div>
                        <TableOrdersTable orders={table.orders} addOrder={addOrder} deleteOrder={deleteOrder}/>
                        <div className="d-flex flex-column flex-lg-row pt-2">
                            {table.availability == 1 && <Button onClick={bookTable} variant="success" className="rounded-0">
                                <i className="bi bi-calendar-fill me-2"></i>{t("book-table")}
                            </Button>}
                            {table.availability == 2 && <>
                                <Button onClick={confirmOrders} variant="success" className="rounded-0 mb-3 mb-lg-0 me-lg-2" disabled={disableSaveOrder(table?.orders ?? [])}>
                                    <i className="bi bi-save-fill me-2"></i>{t("confirm-orders")}
                                </Button>
                                <Button onClick={freeTable} variant="secondary" className="rounded-0">
                                    <i className="bi bi-arrow-clockwise me-2"></i>{t("free-table")}
                                </Button>
                            </>}
                        </div>
                        {table.availability == 2 && <Button onClick={handleShowDishesModal} variant="success" className="position-absolute bottom-0 end-0 me-3 mb-3 pe-lg-3">
                            <i className="bi bi-plus-lg me-0 me-lg-1"></i>
                            <span className="d-none d-lg-inline">{t("add-order")}</span>
                        </Button>}
                        <DishesModal orders={table.orders.map(order => order.dish.id)} show={showDishesModal} onHide={handleHideDishesModal} addOrder={addOrder}/>
                    </Col>}
                </Row>
            </SignedIn>
            <SignedOut>
                <Error>Forbidden</Error>
            </SignedOut>
        </>
    );
}