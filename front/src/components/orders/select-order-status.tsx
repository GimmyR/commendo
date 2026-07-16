import { orderStates } from "@/libs/actions/orders";
import { useState, type ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    orderId: number;
    current: number;
    changeStatus: (orderId: number, status: number) => void;
};

export default function SelectOrderStatus({ orderId, current, changeStatus } : Props) {
    const {t} = useTranslation("orders");
    const [currStatus, setCurrStatus] = useState<number>(current);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as string;
        const nb = parseInt(value);
        setCurrStatus(nb);
        changeStatus(orderId, nb);
    };
    
    return (
        <Form.Select value={currStatus} onChange={handleChange} className={`text-${orderStates[currStatus].color}`}>
            {orderStates.map((status, index) => <option key={status.key} value={index} className={`text-${orderStates[index].color}`}>
                {t(orderStates[index].key)}
            </option>)}
        </Form.Select>
    );
}