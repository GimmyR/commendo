import type { DishWithIngredients } from "@/libs/actions/dishes";
import { CURRENCY } from "@/libs/utils/constants";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
    dishes: DishWithIngredients[];
};

export default function DishesTable({ dishes } : Props) {
    const {t} = useTranslation("table");

    return (
        <Table>
            <thead>
                <tr>
                    <th>{t("name")}</th>
                    <th>{t("price")}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {dishes.map(dish => <tr key={dish.id} className="align-middle">
                    <td>{dish.names[0].name}</td>
                    <td>{dish.price} {CURRENCY.symbol}</td>
                    <td>
                        <Link to="#" className="text-success">
                            <i className="bi bi-plus-lg"></i>
                        </Link>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    );
}