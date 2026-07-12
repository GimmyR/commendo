import SearchModal from "@/components/search-modal";
import type { FilterDish } from "@/libs/actions/dish";
import { useSearch } from "@/libs/hooks/use-search";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    filter: FilterDish;
    setFilter: (newFilter: FilterDish) => void;
};

export default function SearchDishModal({ filter, setFilter } : Props) {
    const {t} = useTranslation("searchDishModal");
    const max = 9999999999;
    const [name, setName] = useState<string>(filter.name ?? "");
    const [minPrice, setMinPrice] = useState<number>(filter.minPrice ?? 0);
    const [maxPrice, setMaxPrice] = useState<number>(filter.maxPrice ?? max);
    const setShow = useSearch((state) => state.setShow);
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const strNb = e.target.value;
        const nb = parseFloat(strNb);

        if(!isNaN(nb) && nb >= 0)
            setMinPrice(nb);

        else setMinPrice(0);
    };

    const handleChangeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const strNb = e.target.value;
        const nb = parseFloat(strNb);

        if(!isNaN(nb) && nb > 0)
            setMaxPrice(nb);

        else setMaxPrice(max);
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShow(false);
        setFilter({ name, minPrice, maxPrice });
    };

    const handleReset = () => {
        const newFilter: FilterDish = { name: undefined, minPrice: undefined, maxPrice: undefined };
        setFilter({...newFilter});
        setName("");
        setMinPrice(0);
        setMaxPrice(max);
        setShow(false);
    };

    return (
        <SearchModal header={t("header")}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dish-name">{t("dishName")}</Form.Label>
                    <Form.Control id="dish-name" type="text" value={name} onChange={handleChangeName} placeholder="Romazava"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dish-min-price">{t("dishMinPrice")}</Form.Label>
                    <Form.Control id="dish-min-price" type="number" value={minPrice} onChange={handleChangeMinPrice} step="any"/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="dish-max-price">{t("dishMaxPrice")}</Form.Label>
                    <Form.Control id="dish-max-price" type="number" value={maxPrice} onChange={handleChangeMaxPrice} step="any"/>
                </Form.Group>
                <Form.Group className="d-flex flex-row justify-content-end">
                    <Button type="reset" variant="secondary" onClick={handleReset}>{t("reset")}</Button>
                    <Button type="submit" className="ms-2">{t("submit")}</Button>
                </Form.Group>
            </Form>
        </SearchModal>
    );
}