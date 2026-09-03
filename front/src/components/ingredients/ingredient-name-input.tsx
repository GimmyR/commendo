import type { CreateIngredientName } from "@/libs/actions/ingredients";
import type { ChangeEvent } from "react";
import { Form, Stack } from "react-bootstrap";

type Props = {
    name: CreateIngredientName;
    language: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function IngredientNameInput({ name, language, onChange } : Props) {
    return (
        <Stack direction="horizontal" className="mb-2">
            <div className="col-4">
                <Form.Control type="text" value={language} disabled/>
            </div>
            <div className="col-8 ps-2">
                <Form.Control type="text" value={name.name} onChange={onChange} placeholder="Lorem ipsum"/>
            </div>
        </Stack>
    );
}