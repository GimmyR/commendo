import type { ChangeEvent } from "react";
import { Form, InputGroup } from "react-bootstrap";

type Props = {
    icon: string;
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
};

export default function SignInInputGroup({ icon, type, value, onChange, placeholder, className } : Props) {
    return (
        <InputGroup className={`mb-3 ${className}`}>
            <InputGroup.Text className="rounded-0">
                <i className={`bi bi-${icon}`}></i>
            </InputGroup.Text>
            <Form.Control type={type} value={value} onChange={onChange} placeholder={placeholder} className="rounded-0"/>
        </InputGroup>
    );
}