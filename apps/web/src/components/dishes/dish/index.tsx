import { CURRENCY } from "@/libs/utils/constants";
import type { DishWithIngredients } from "@repo/shared";

type Props = {
    dish: DishWithIngredients
};

export default function Dish({ dish } : Props) {
    return (
        <div className="p-3 border border-2">
            <div className="border" style={{ height: "200px" }}></div>
            <div className="pt-3 pb-2">
                <div className="d-flex flex-row justify-content-center">
                    <strong className="text-truncate" title={dish.names[0].name}>
                        {dish.names[0].name}
                    </strong>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <span className="me-1">{dish.price}</span>
                    <span>{CURRENCY.symbol}</span>
                </div>
            </div>
        </div>
    );
}