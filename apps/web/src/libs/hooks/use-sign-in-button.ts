import { useState } from "react";

export default function useSignInButton() {
    const [isShown, setIsShown] = useState(false);

    const showSignIn = () => {
        setIsShown(true);
    };

    const closeSignIn = () => {
        setIsShown(false);
    };

    return {isShown, showSignIn, closeSignIn};
}