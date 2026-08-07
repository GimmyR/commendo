import OrdersTable from "@/components/orders/table";
import useOtherOrders from "@/libs/hooks/use-other-orders";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    onHide: () => void;
};

export default function OtherOrdersModal(props : Props) {
    const {t} = useTranslation("orders");
    const { others } = useOtherOrders(props.show);

    return (
        <Modal {...props} size="lg" scrollable>
            <Modal.Header closeButton className="fw-bold fs-5">{t("other-orders")}</Modal.Header>
            <Modal.Body>
                <OrdersTable orders={others}/>
            </Modal.Body>
        </Modal>
    );
}