import { useState } from "react";

export default function useAddIngredient() {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const displayAdd = () => setShowAdd(true);
    const hideAdd = () => setShowAdd(false);

    return {showAdd, displayAdd, hideAdd};
}