import {
    ADMIN_LOGIN_FAILURE, ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS, ADMIN_SIGNUP_FAILURE,
    ADMIN_SIGNUP_REQUEST, ADMIN_SIGNUP_SUCCESS,
    LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCESS,
    SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCESS,
    USER_FORGET_PASS_FIND_ACCOUNT_BY_EMAIL_FAIL,
    USER_FORGET_PASS_FIND_ACCOUNT_BY_EMAIL_REQUEST,
    USER_FORGET_PASS_FIND_ACCOUNT_BY_EMAIL_SUCCESS,
    USER_CONFIRM_PASS_FIND_ACCOUNT_BY_EMAIL_REQUEST,
    USER_CONFIRM_PASS_FIND_ACCOUNT_BY_EMAIL_SUCCESS,
    USER_CONFIRM_PASS_FIND_ACCOUNT_BY_EMAIL_FAIL,
    IMMEDIATELY_LOGIN_AFTER_RESGISTER,
    LOGOUT_SUCCESS
} from "./actionsTypes"

const initialState = {
    isAuth: false,
    token: "",
    adminToken: "",
    adminIsAuth: false,
    isLoginLoading: false,
    isLoginError: false,
    isSignupLoading: false,
    isSignupgError: false,
    isAdminLoginLoading: false,
    isAdminLoginError: false,
    isAdminSignupLoading: false,
    isAdminSignupgError: false,
    userForgetPassFindAccountIsLoading: false,
    userForgetPassFindAccountIsError: false,
    userConfirmPassFindAccountIsLoading: false,
    userConfirmPassFindAccountIsError: false,
    userSignupPreviousState : "",
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, isLoginLoading: true };
        case LOGIN_SUCESS:
            return { ...state, isLoginLoading: false, isAuth: true, token: payload, userSignupPreviousState : "" };
        case LOGIN_FAIL:
            return { ...state, isLoginLoading: false, isLoginError: true };
        case SIGNUP_REQUEST:
            return { ...state, isSignupLoading: true };
        case SIGNUP_SUCESS:
            return { ...state, isSignupLoading: false, token: payload, isSignupgError: false, userSignupPreviousState : "signup" };
        case SIGNUP_FAIL:
            return { ...state, isSignupLoading: false, isSignupgError: true };
        case ADMIN_LOGIN_REQUEST:
            return { ...state, isAdminLoginLoading: true };
        case ADMIN_LOGIN_SUCCESS:
            return { ...state, isAdminLoginLoading: false, adminIsAuth: true, adminToken: payload }
        case ADMIN_LOGIN_FAILURE:
            return { ...state, isAdminLoginLoading: false, isAdminLoginError: true }
        case ADMIN_SIGNUP_REQUEST:
            return { ...state, isAdminSignupLoading: true, }
        case ADMIN_SIGNUP_SUCCESS:
            return { ...state, isAdminSignupLoading: false, isAdminSignupgError: false };
        case IMMEDIATELY_LOGIN_AFTER_RESGISTER:
            return { ...state, adminToken: payload };
        case ADMIN_SIGNUP_FAILURE:
            return { ...state, isAdminSignupLoading: false, isAdminSignupgError: true };
        case USER_FORGET_PASS_FIND_ACCOUNT_BY_EMAIL_REQUEST:
            return { ...state, userForgetPassFindAccountIsLoading: true };
        case USER_FORGET_PASS_FIND_ACCOUNT_BY_EMAIL_SUCCESS:
            return { ...state, userForgetPassFindAccountIsLoading: false };
        case USER_FORGET_PASS_FIND_ACCOUNT_BY_EMAIL_FAIL:
            return { ...state, userForgetPassFindAccountIsLoading: false, userForgetPassFindAccountIsError: true }
        case USER_CONFIRM_PASS_FIND_ACCOUNT_BY_EMAIL_REQUEST:
            return { ...state, userConfirmPassFindAccountIsLoading: true };
        case USER_CONFIRM_PASS_FIND_ACCOUNT_BY_EMAIL_SUCCESS:
            return { ...state, userConfirmPassFindAccountIsLoading: false };
        case USER_CONFIRM_PASS_FIND_ACCOUNT_BY_EMAIL_FAIL:
            return { ...state, userConfirmPassFindAccountIsLoading: false, userConfirmPassFindAccountIsError: true };
            case LOGOUT_SUCCESS :
                return {...state, isAuth : false, token : null,}
        default:
            return { ...state }
    }
}