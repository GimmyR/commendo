import DishItem from "@/components/dishes/dish-item";
import DishModal from "@/components/dishes/dish-modal";
import SearchDishModal from "@/components/dishes/search-modal";
import Pages from "@/components/pagination";
import useDishes from "@/libs/hooks/use-dishes";
import { DishWithIngredients } from "@repo/shared";
import { useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Dishes() {
    const {loadingDishes, dishes, pages, currPage, filter, setCurrPage, setFilter} = useDishes();
    const [showDishModal, setShowDishModal] = useState<boolean>(false);
    const [selectedDish, setSelectedDish] = useState<DishWithIngredients>();

    const handleShowDishModal = (dish: DishWithIngredients) => {
        setSelectedDish(dish);
        setShowDishModal(true);
    };

    const handleHideDishModal = () => setShowDishModal(false);

    if(loadingDishes)
        return <Spinner className="position-absolute top-50 start-50"/>

    return (
        <Row className="justify-content-center pt-5">
            <Col>
                <div className="d-flex flex-wrap mb-5">
                    {dishes.map(dish => <div key={dish.id} className="col-12 col-sm-6 col-xl-3 p-3">
                        <DishItem dish={dish} onClick={() => handleShowDishModal(dish)}/>
                    </div>)}
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <Pages pages={pages} current={currPage} setCurrent={setCurrPage}/>
                </div>
                {selectedDish && <DishModal dish={selectedDish} show={showDishModal} onHide={handleHideDishModal}/>}
                <SearchDishModal filter={filter} setFilter={setFilter}/>
            </Col>
        </Row>
    );
}