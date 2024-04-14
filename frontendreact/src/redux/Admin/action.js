import axios from "axios";
import {
    ADMIN_ADD_PRODUCT_FAIL, ADMIN_ADD_PRODUCT_REQUEST,
    ADMIN_ADD_PRODUCT_SUCESS, ADMIN_ADD_UPDATE_REQUEST,
    ADMIN_ADD_UPDATE_SUCESS, ADMIN_GET_PRODUCT_FAIL,
    ADMIN_GET_PRODUCT_REQUEST, ADMIN_GET_PRODUCT_SUCESS,
    ADMIN_ADD_UPDATE_FAIL, ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCESS, ADMIN_DELETE_PRODUCT_FAIL
} from "./actionTypes"
const api = process.env.REACT_APP_API_LOCALHOST;

export const adminAddProduct = (data, token, toast) => (dispatch) => {
    dispatch({ type: ADMIN_ADD_PRODUCT_REQUEST });
    return axios.post(`${api}/product/admin/new`, data, {
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        }
    }).then((res) => {
        console.log(res.data);
        dispatch({ type: ADMIN_ADD_PRODUCT_SUCESS });
        toast({
            title: 'Product Added',
            description: "Product Added successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position : 'top',
        })
    }).catch((err) => {
        dispatch({ type: ADMIN_ADD_PRODUCT_FAIL });
        toast({
            title: 'Something went wrong',
            description: "Please try again",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position : 'top',
        })
    })
}

export const getAdminProduct = (token) => (dispatch) => {
    dispatch({ type: ADMIN_GET_PRODUCT_REQUEST });
    axios.get(`${api}/admin/products`, {
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        }
    }).then((res) => {
        dispatch({ type: ADMIN_GET_PRODUCT_SUCESS, payload: res.data })
    }).catch((res) => {
        dispatch({ type: ADMIN_GET_PRODUCT_FAIL });
    })
}


export const updateProduct = (id, data, token, toast) => (dispatch) => {
    dispatch({ type: ADMIN_ADD_UPDATE_REQUEST });

    axios.post(`${api}/products/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        dispatch({ type: ADMIN_ADD_UPDATE_SUCESS });
        toast({
            title: 'Successfully Updated',
          description: "Produted successfully updated",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position : "top"

        })
        console.log(res.data);
    }).catch((err) => {
        dispatch({ type: ADMIN_ADD_UPDATE_FAIL });
        toast({
            title: err.message || err || "Something went wrong",
          description: "Please try again",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position : "top"

        })
    })
}


export const deleteProduct = (id, token, toast) => (dispatch) => {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });
    axios.delete(`${api}/product/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        dispatch({ type: ADMIN_DELETE_PRODUCT_SUCESS });
        console.log(res.data);
    }).catch((err) => {
        dispatch({ type: ADMIN_DELETE_PRODUCT_FAIL })
    })
}