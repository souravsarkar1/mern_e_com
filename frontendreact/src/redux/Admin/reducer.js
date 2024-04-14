import { ADMIN_ADD_PRODUCT_FAIL, ADMIN_ADD_PRODUCT_REQUEST, ADMIN_ADD_PRODUCT_SUCESS, ADMIN_ADD_UPDATE_FAIL, ADMIN_ADD_UPDATE_REQUEST, ADMIN_ADD_UPDATE_SUCESS, ADMIN_DELETE_PRODUCT_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCESS, ADMIN_GET_PRODUCT_FAIL, ADMIN_GET_PRODUCT_REQUEST, ADMIN_GET_PRODUCT_SUCESS } from "./actionTypes";

const initialState = {
    allProduct: null,
    addProductIsLoading: false,
    addProductIsError: false,
    getProductIsLoading: false,
    getProductIsError: false,
    deleteProductIsError: false,
    deleteProductIsLoading: false,
    updateProductIsLoading: false,
    updateProductIsError: false,
    adminIsAuth : false,
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADMIN_ADD_PRODUCT_REQUEST:
            return { ...state, addProductIsLoading: true };
        case ADMIN_ADD_PRODUCT_SUCESS:
            return { ...state, addProductIsLoading: false, }
        case ADMIN_ADD_PRODUCT_FAIL:
            return { ...state, addProductIsLoading: false, addProductIsError: true }
        case ADMIN_GET_PRODUCT_REQUEST:
            return { ...state, getProductIsLoading: true };
        case ADMIN_GET_PRODUCT_SUCESS:
            return { ...state, getProductIsLoading: false };
        case ADMIN_GET_PRODUCT_FAIL:
            return { ...state, getProductIsLoading: false, getProductIsError: true }
        case ADMIN_DELETE_PRODUCT_REQUEST:
            return { ...state, deleteProductIsLoading: true };
        case ADMIN_DELETE_PRODUCT_SUCESS:
            return { ...state, deleteProductIsLoading: false, };
        case ADMIN_DELETE_PRODUCT_FAIL:
            return { ...state, deleteProductIsLoading: false, deleteProductIsError: true };
        case ADMIN_ADD_UPDATE_REQUEST:
            return { ...state, updateProductIsLoading: true }
        case ADMIN_ADD_UPDATE_SUCESS:
            return { ...state, updateProductIsLoading: false }
        case ADMIN_ADD_UPDATE_FAIL:
            return { ...state, updateProductIsLoading: false, updateProductIsError: true }
        default:
            return { ...state };
    }
}