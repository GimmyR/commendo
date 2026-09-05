import IconLink from "@/components/icon-link";
import type { Ingredient } from "@/libs/actions/ingredients";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    ingredients: Ingredient[];
    selectToDelete: (ingredient: Ingredient) => void;
    selectToToggleStatus: (ingredient: Ingredient) => void;
};

export default function IngredientsList({ ingredients, selectToDelete, selectToToggleStatus } : Props) {
    const {t} = useTranslation("ingredients");

    if(ingredients.length == 0)
        return (
            <div className="d-flex flex-row justify-content-center align-items-center border" style={{ height: "200px" }}>
                <p className="fw-bold text-uppercase mb-0">No data</p>
            </div>
        );

    return (
        <Table variant="light" className="text-center" hover bordered>
            <thead>
                <tr>
                    <th className="d-none d-md-table-cell">ID</th>
                    <th>{t("name")}</th>
                    <th>{t("quantity")}</th>
                    <th>{t("status")}</th>
                    <th>{t("edit")}</th>
                    <th>{t("archive")}</th>
                    <th>{t("delete")}</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map(ingredient => <tr key={ingredient.id} className="align-middle">
                    <td className="d-none d-md-table-cell">{ingredient.id}</td>
                    <td>{ingredient.names[0].name}</td>
                    <td>{0} {ingredient.unit}</td>
                    <td>{ingredient.active ? t("active") : t("inactive")}</td>
                    <td>
                        <IconLink to="#" icon="pencil-square" linkClass="text-success"/>
                    </td>
                    <td>
                        <IconLink to="#" icon={ingredient.active ? "archive-fill" : "archive"} linkClass="text-success" onClick={() => selectToToggleStatus(ingredient)}/>
                    </td>
                    <td>
                        <IconLink to="#" icon="trash-fill" linkClass="text-success" onClick={() => selectToDelete(ingredient)}/>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    );
}