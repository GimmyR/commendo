import { create } from "zustand";

interface ISearch {
    show: boolean;
    setShow: (status: boolean) => void;
}

export const useSearch = create<ISearch>()(
    (set) => ({
        show: false,
        setShow: (status: boolean) => {
            set({ show: status });
        }
    })
);