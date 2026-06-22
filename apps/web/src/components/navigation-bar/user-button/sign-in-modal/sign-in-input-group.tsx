import type { ChangeEvent } from "react";
import { Form, InputGroup } from "react-bootstrap";

type Props = {
    icon: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
};

export default function SignInInputGroup({ icon, type, value, onChange, placeholder, className } : Props) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <InputGroup className={`mb-3 ${className}`}>
            <InputGroup.Text className="rounded-0">
                <i className={`bi bi-${icon}`}></i>
            </InputGroup.Text>
            <Form.Control type={type} value={value} onChange={handleChange} placeholder={placeholder} className="rounded-0"/>
        </InputGroup>
    );
}