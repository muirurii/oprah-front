import actionTypes from ".";

export const setUser = (dispatch, user) => {
    dispatch({
        type: actionTypes.setUser,
        payload: {
            ...user,
            isLogged: true
        }
    });
}

export const resetUser = (dispatch) => {
    dispatch({
        type: actionTypes.resetUser,
    });
}

export const addBookMark = (dispatch, payload) => {
    dispatch({
        type: actionTypes.addBookMark,
        payload
    });
}
export const removeBookMark = (dispatch, payload) => {
    dispatch({
        type: actionTypes.removeBookMark,
        payload
    });
}