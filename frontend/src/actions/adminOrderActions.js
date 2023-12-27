// adminlistOrders
import Axios from "axios";
import {
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_DETAILS_REQUEST,
  ADMIN_ORDER_DETAILS_SUCCESS,
  ADMIN_ORDER_DETAILS_FAIL,
} from "../constants/adminOrderConstants";

export const adminlistOrders = () => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_ORDER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/admin/orders", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ADMIN_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_ORDER_LIST_FAIL, payload: error.message });
  }
};

export const adminDetailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/admin/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ADMIN_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
