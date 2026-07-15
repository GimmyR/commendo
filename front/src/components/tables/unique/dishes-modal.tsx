import DishesTable from "@/components/tables/unique/dishes-table";
import type { DishWithIngredients } from "@/libs/actions/dishes";
import useDishes from "@/libs/hooks/use-dishes";
import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    orders: number[];
    show: boolean;
    onHide: () => void;
    addOrder: (dish: DishWithIngredients) => void;
};

export default function DishesModal({ show, orders, onHide, addOrder } : Props) {
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
                    <DishesTable dishes={dishes.filter(dish => !orders.includes(dish.id))} addOrder={addOrder}/>
                )}
            </Modal.Body>
        </Modal>
    );
}