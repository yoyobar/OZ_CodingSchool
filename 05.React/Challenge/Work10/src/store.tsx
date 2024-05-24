import { create } from 'zustand';

interface StoreType {
    visible: boolean;
    text: string;

    modalOn: (text: string) => void;
    modalClose: () => void;
}

export const useModal = create<StoreType>((set) => ({
    visible: false,
    text: '',

    modalOn: (text: string) => {
        set(() => ({
            text: text,
            visible: true,
        }));
    },
    modalClose: () => {
        set(() => ({
            visible: false,
        }));
    },
}));
