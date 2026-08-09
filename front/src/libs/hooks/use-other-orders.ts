import { fetchOtherOrders, type OrderWithTableAndDish } from "@/libs/actions/orders";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useOtherOrders(show: boolean) {
    const [others, setOthers] = useState<OrderWithTableAndDish[]>([]);
    const language = useLanguage((state) => state.lang);

    useEffect(() => {
        if(show) {
            fetchOtherOrders(language)
                .then(data => {
                    setOthers(data);
                })
                .catch(err => console.warn(err));
        } else {
            setTimeout(() => setOthers([]), 500);
        }
    }, [show, language]);

    return {others};
}