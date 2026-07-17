import type { DishWithIngredients } from "@/libs/actions/dishes";
import { API_URL, CURRENCY } from "@/libs/utils/constants";
import { Modal, Table } from "react-bootstrap";

type Props = {
    dish: DishWithIngredients;
    show: boolean;
    onHide: () => void;
};

export default function DishModal({ dish, show, onHide } : Props) {
    const imageStyle: React.CSSProperties = { 
        backgroundImage: `url(${API_URL}/resource/${dish.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center pt-5 pb-4">
                <div className="col-8 col-lg-6 border border-3" style={{ height: "250px", ...imageStyle }}></div>
                <div className="col-12 pt-5 pb-3 px-5">
                    <div className="d-flex flex-column align-items-center mb-4">
                        <h1 className="text-success text-decoration-underline text-center fs-5">{dish.names[0].name}</h1>
                        <span>
                            <strong>{dish.price}</strong> {CURRENCY.symbol}
                        </span>
                    </div>
                    <Table>
                        <tbody>
                            {dish.ingredients.map(ingr => <tr key={ingr.ingredient.id}>
                                <td className="text-dark fw-bold">{ingr.ingredient.names[0].name}</td>
                                <td></td>
                                <td className="text-end">{ingr.quantity} {ingr.ingredient.unit}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
        </Modal>
    );
}