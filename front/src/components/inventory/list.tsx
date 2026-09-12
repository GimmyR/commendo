import IconLink from "@/components/icon-link";
import type { IngredientMovement } from "@/libs/actions/inventory";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    movements: IngredientMovement[]
};

export default function MovementsList({ movements } : Props) {
    const {t} = useTranslation("inventory");

    if(movements.length == 0)
        return (
            <div className="d-flex flex-row justify-content-center">
                <div className="col-12 col-lg-8 text-dark fw-bold text-center text-uppercase py-5 border">No data</div>
            </div>
        );

    return (
        <Table bordered hover className="text-center">
            <thead>
                <tr className="align-middle">
                    <th>ID</th>
                    <th>{t("ingredient")}</th>
                    <th>Type</th>
                    <th>{t("quantity")}</th>
                    <th>{t("purchase-price")}</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movements.map(movement => <tr key={movement.id} className="align-middle">
                    <td>{movement.id}</td>
                    <td className="d-none d-sm-table-cell text-center">
                        {movement.ingredient.names[0].name}
                    </td>
                    <td className="d-table-cell d-sm-none text-center">
                        {movement.ingredient.id}
                    </td>
                    <td>{movement.type}</td>
                    <td>{movement.quantity} {movement.ingredient.unit}</td>
                    <td>{movement.purchasePrice} Ar</td>
                    <td>
                        <IconLink to="#" icon="pencil-square" linkClass="text-success"/>
                    </td>
                    <td>
                        <IconLink to="#" icon="trash" linkClass="text-success"/>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    );
}