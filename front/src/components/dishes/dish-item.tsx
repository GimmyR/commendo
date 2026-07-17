import type { DishWithIngredients } from "@/libs/actions/dishes";
import { API_URL, CURRENCY } from "@/libs/utils/constants";
import { useState } from "react";

type Props = {
    dish: DishWithIngredients;
    onClick: () => void;
};

export default function DishItem({ dish, onClick } : Props) {
    const [active, setActive] = useState<boolean>(false);
    const imageStyle: React.CSSProperties = { 
        backgroundImage: `url(${API_URL}/resource/${dish.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    };

    const handleHover = () => setActive(true);
    const handleLeave = () => setActive(false);

    return (
        <div className={`p-3 border border-2 ${active && 'shadow'}`} onClick={onClick} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <div className="border" style={{ height: "200px", ...imageStyle }}></div>
            <div className="pt-3 pb-2">
                <div className="d-flex flex-row justify-content-center">
                    <strong className="text-success text-truncate" title={dish.names[0].name}>
                        {dish.names[0].name}
                    </strong>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <span className="fw-bold me-1">{dish.price}</span>
                    <span>{CURRENCY.symbol}</span>
                </div>
            </div>
        </div>
    );
}