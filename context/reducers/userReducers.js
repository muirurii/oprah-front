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
        case actionTypes.addBookMark:
            {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        bookmarks: [...state.user.bookmarks, action.payload]
                    }
                }
            }
        case actionTypes.removeBookMark:
            {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        bookmarks: state.user.bookmarks.filter(id => id !== action.payload)
                    }
                }
            }
        default:
            {
                return state;
            }
    }
}