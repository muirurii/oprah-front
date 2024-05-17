import actionTypes from ".";

export const toggleMenu = (dispatch, data) => {
    dispatch({
        type: actionTypes.toggleMenu,
        payload: data
    });
}