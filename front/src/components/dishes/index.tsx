import DishItem from "@/components/dishes/dish-item";
import DishModal from "@/components/dishes/dish-modal";
import Pages from "@/components/pagination";
import type { DishWithIngredients } from "@/libs/actions/dishes";
import useDishes from "@/libs/hooks/use-dishes";
import { useState, type ChangeEvent } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Dishes() {
    const {loadingDishes, dishes, pages, currPage, filter, setCurrPage, setFilter} = useDishes(1, 9);
    const [showDishModal, setShowDishModal] = useState<boolean>(false);
    const [selectedDish, setSelectedDish] = useState<DishWithIngredients>();
    const { t } = useTranslation("dishes");

    const handleShowDishModal = (dish: DishWithIngredients) => {
        setSelectedDish(dish);
        setShowDishModal(true);
    };

    const handleHideDishModal = () => setShowDishModal(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, name: e.target.value});
    };

    if(loadingDishes)
        return <Spinner className="position-absolute top-50 start-50"/>

    return (
        <Row className="justify-content-center pt-5">
            <Col className="col-10 col-sm-8 col-md-12 col-lg-10 col-xxl-7">
                <div className="d-flex flex-row justify-content-center">
                    <div className="col-10 col-lg-6 mt-4 mb-5 ">
                        <Form.Control type="text" value={filter.name} onChange={handleChange} className="rounded-5 px-3 shadow-sm" placeholder={t("search")}/>
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-5">
                    {dishes.map(dish => <div key={dish.id} className="col-12 col-md-4 p-3">
                        <DishItem dish={dish} onClick={() => handleShowDishModal(dish)}/>
                    </div>)}
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <Pages pages={pages} current={currPage ?? 1} setCurrent={setCurrPage}/>
                </div>
                {selectedDish && <DishModal dish={selectedDish} show={showDishModal} onHide={handleHideDishModal}/>}
            </Col>
        </Row>
    );
}