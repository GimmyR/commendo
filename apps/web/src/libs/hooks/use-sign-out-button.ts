import { useState } from "react";

export default function useSignOutButton() {
    const [isShown, setIsShown] = useState(false);

    const showSignOut = () => {
        setIsShown(true);
    };

    const closeSignOut = () => {
        setIsShown(false);
    };

    return {isShown, showSignOut, closeSignOut};
}