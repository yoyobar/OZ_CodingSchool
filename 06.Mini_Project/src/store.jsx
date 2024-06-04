import { create } from 'zustand';

export const useModal = create((set) => ({
    visible: false,
    text: '',

    modalOn: (text) => {
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

export const useBookmark = create((set) => ({
    mark: [],

    setMark: (data) => {
        set((state) => ({
            mark: [...state.mark, data],
        }));
    },
}));
