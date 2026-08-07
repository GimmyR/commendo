import OrdersTable from "@/components/orders/table";
import { fetchOtherOrders, type OrderWithTableAndDish } from "@/libs/actions/orders";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    onHide: () => void;
};

export default function OtherOrdersModal(props : Props) {
    const {t} = useTranslation("orders");
    const [orders, setOrders] = useState<OrderWithTableAndDish[]>([]);
    const language = useLanguage((state) => state.lang);

    useEffect(() => {
        if(props.show) {
            fetchOtherOrders(language)
                .then(data => {
                    setOrders(data);
                })
                .catch(err => console.warn(err));
        } else {
            setTimeout(() => setOrders([]), 500);
        }
    }, [props.show, language]);

    return (
        <Modal {...props} size="lg" scrollable>
            <Modal.Header closeButton className="fw-bold fs-5">{t("other-orders")}</Modal.Header>
            <Modal.Body>
                <OrdersTable orders={orders}/>
            </Modal.Body>
        </Modal>
    );
}