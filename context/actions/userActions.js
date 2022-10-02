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