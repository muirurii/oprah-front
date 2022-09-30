import actionTypes from "../actions"

export const userReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.setUser:
            {
                return {
                    ...state,
                    user: action.payload
                }
            }
        default:
            {
                return state;
            }
    }
}