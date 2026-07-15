import SearchDishModal from "@/components/dishes/search-modal";
import type { FilterDish } from "@/libs/actions/dishes";
import { useSearch } from "@/libs/hooks/use-search";
import { render, screen } from "@testing-library/react";
import '@/i18n';

const filter: FilterDish = {
    name: "maza",
    minPrice: 24000,
    maxPrice: 26000
};

const setFilter = (newFilter: FilterDish) => {
    if(!newFilter)
        console.error("Filter not found");
};

describe("Test SearchDishModal", () => {
    it("Should display form to search dish", () => {
        useSearch.getState().setShow(true);
        render(<SearchDishModal filter={filter} setFilter={setFilter}/>);

        const inputDishName = screen.getByLabelText("Nom du plat");
        expect(inputDishName).toBeInTheDocument();
        expect(inputDishName).toBeInstanceOf(HTMLInputElement);
        expect(inputDishName).toHaveValue(filter.name);

        const inputDishMin = screen.getByLabelText("Prix minimum");
        expect(inputDishMin).toBeInTheDocument();
        expect(inputDishMin).toBeInstanceOf(HTMLInputElement);
        expect(inputDishMin).toHaveValue(filter.minPrice);

        const inputDishMax = screen.getByLabelText("Prix maximum");
        expect(inputDishMax).toBeInTheDocument();
        expect(inputDishMax).toBeInstanceOf(HTMLInputElement);
        expect(inputDishMax).toHaveValue(filter.maxPrice);

        const resetBtn = screen.getByRole("button", { name: /réinitialiser/i });
        expect(resetBtn).toBeInTheDocument();

        const submitBtn = screen.getByRole("button", { name: /chercher/i });
        expect(submitBtn).toBeInTheDocument();
    });
});