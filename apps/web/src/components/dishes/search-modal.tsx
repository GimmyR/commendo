import SearchModal from "@/components/search-modal";
import type { FilterDish } from "@/libs/actions/dish";
import { useSearch } from "@/libs/hooks/use-search";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button, Form } from "react-bootstrap";

type Props = {
    filter: FilterDish;
    setFilter: (newFilter: FilterDish) => void;
};

export default function SearchDishModal({ filter, setFilter } : Props) {
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
        <SearchModal header="Rechercher un plat">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nom du plat</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleChangeName} placeholder="Romazava"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prix minimum</Form.Label>
                    <Form.Control type="number" value={minPrice} onChange={handleChangeMinPrice} step="any"/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Prix maximum</Form.Label>
                    <Form.Control type="text" value={maxPrice} onChange={handleChangeMaxPrice} step="any"/>
                </Form.Group>
                <Form.Group className="d-flex flex-row justify-content-end">
                    <Button type="reset" variant="secondary" onClick={handleReset}>Réinitialiser</Button>
                    <Button type="submit" className="ms-2">Chercher</Button>
                </Form.Group>
            </Form>
        </SearchModal>
    );
}