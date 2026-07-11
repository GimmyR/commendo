import { CURRENCY } from "@/libs/utils/constants";
import type { DishWithIngredients } from "@repo/shared";
import { useState } from "react";

type Props = {
    dish: DishWithIngredients
};

export default function DishItem({ dish } : Props) {
    const [active, setActive] = useState<boolean>(false);

    const handleHover = () => setActive(true);
    const handleLeave = () => setActive(false);

    return (
        <div className={`p-3 border border-2 ${active && 'shadow'}`} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
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