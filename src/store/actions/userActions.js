import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})
export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
export const loadingModalSuccess = () => ({
    type: actionTypes.LOADING_MODAL_SUCCESS,
})
export const loadingModalFail = () => ({
    type: actionTypes.LOADING_MODAL_FAIL
})
