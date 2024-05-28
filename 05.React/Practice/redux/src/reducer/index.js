export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const initialState = {
    modal: {
        isShow: false,
    },
};

/**
 * 루트 리듀서
 * @param {*} state : 현재 상태
 * @param {*} action : 액션 객체(함수를 호출하는 주문)
 * @returns : 변경된 상태
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modal: {
                    isShow: true,
                },
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modal: {
                    isShow: false,
                },
            };
        default:
            return state;
    }
};

export default rootReducer;
