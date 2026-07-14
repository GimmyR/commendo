import SignInInputGroup from "@/components/navigation-bar/user-button/sign-in-modal/sign-in-input-group";
import { render, screen } from "@testing-library/react";
import type { ChangeEvent } from "react";

const props = {
    icon: "person",
    type: "test",
    value: "johndoe",
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    },
    placeholder: "Username"
};

describe("Test SignInInputGroup", () => {
    it("Should display text input with placeholder", () => {
        render(<SignInInputGroup {...props}/>);
        const input = screen.getByPlaceholderText(props.placeholder);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(props.value);
    });
});