import Dish from "@/components/dishes/dish";
import useDishes from "@/libs/hooks/use-dishes";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Dishes() {
    const {loadingDishes, dishes, pages, currPage, setCurrPage} = useDishes();

    if(loadingDishes)
        return <Spinner className="position-absolute top-50 start-50"/>

    return (
        <Row className="justify-content-center pt-5">
            <Col className="d-flex flex-wrap">
                {dishes.map(dish => <div key={dish.id} className="col-12 col-sm-6 col-xl-3 p-3">
                    <Dish dish={dish}/>
                </div>)}
            </Col>
        </Row>
    );
}