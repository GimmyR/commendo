import DishItem from "@/components/dishes/dish-item";
import Pages from "@/components/pagination";
import useDishes from "@/libs/hooks/use-dishes";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Dishes() {
    const {loadingDishes, dishes, pages, currPage, setCurrPage} = useDishes();

    if(loadingDishes)
        return <Spinner className="position-absolute top-50 start-50"/>

    return (
        <Row className="justify-content-center pt-5">
            <Col>
                <div className="d-flex flex-wrap mb-5">
                    {dishes.map(dish => <div key={dish.id} className="col-12 col-sm-6 col-xl-3 p-3">
                        <DishItem dish={dish}/>
                    </div>)}
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <Pages pages={pages} current={currPage} setCurrent={setCurrPage}/>
                </div>
            </Col>
        </Row>
    );
}