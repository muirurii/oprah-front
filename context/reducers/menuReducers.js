import actionTypes from "../actions";

export const menuReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.toggleMenu:
            {
                return {
                    ...state,
                    menu: !state.menu
                }
            }
        default:
            return state
    }
}