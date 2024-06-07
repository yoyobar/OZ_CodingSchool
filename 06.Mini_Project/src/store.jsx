import { create } from 'zustand';

export const useModal = create((set) => ({
    visible: false,
    text: '',

    //! 1. 함수 만들떄 첫번쨰 인자 = 매개 인자 값 modalOn(3)
    //! 2. state, 이부분은 this를 의미, state.visible usemodal.visible
    //! 3. 만약 set을 사용했다면 state는 없고, 리턴값으로 객체를 줘서 수정가능
    //! 4. persist
    modalOn: (text) => {
        () => ({
            text: text,
            visible: true,
        });
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
