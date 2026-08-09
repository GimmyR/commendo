import OtherOrdersModal from "@/components/orders/other-orders-modal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function OtherOrdersButton() {
    const [show, setShow] = useState<boolean>(false);
    const { t } = useTranslation("orders");

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Button onClick={handleShow} variant="secondary" className="position-absolute bottom-0 end-0 mb-4 me-4">
                <i className="bi bi-archive me-0 me-md-2"></i>
                <span className="d-none d-md-inline">{t("see-others")}</span>
            </Button>
            <OtherOrdersModal show={show} onHide={handleHide}/>
        </>
    );
}