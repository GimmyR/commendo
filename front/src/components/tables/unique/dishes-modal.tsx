import DishesTable from "@/components/tables/unique/dishes-table";
import useDishes from "@/libs/hooks/use-dishes";
import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    onHide: () => void;
};

export default function DishesModal({ show, onHide } : Props) {
    const {dishes, loadingDishes} = useDishes();
    const {t} = useTranslation("table");

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                {t("select-dish")}
            </Modal.Header>
            <Modal.Body>
                {loadingDishes ? (
                    <Spinner className="position-relative top-50 start-50"/>
                ) : (
                    <DishesTable dishes={dishes}/>
                )}
            </Modal.Body>
        </Modal>
    );
}