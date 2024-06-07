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
        set((state) => {
            const alreadyCheck = state.mark.filter((item) => String(item) === String(data));
            if (alreadyCheck.length === 1) {
                return {
                    mark: [...state.mark],
                };
            }
            return {
                mark: [...state.mark, data],
            };
        });
    },

    deleteMark: (id) => {
        set((state) => ({
            mark: state.mark.filter((item) => String(item) !== String(id)),
        }));
    },
}));
