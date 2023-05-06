import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isShowLoading: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        //LOADING MODAL 
        case actionTypes.LOADING_MODAL_SUCCESS:
            return {
                ...state,
                isShowLoading: true
            }
            case actionTypes.LOADING_MODAL_FAIL:
                return {
                    ...state,
                    isShowLoading: false
                }
        default:
            return state;
    }
}

export default appReducer;