import Axios from "axios";
import {
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_DETAILS_REQUEST,
  ADMIN_ORDER_DETAILS_SUCCESS,
  ADMIN_ORDER_DETAILS_FAIL,
} from "../constants/adminOrderConstants";

export const adminOrderListReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_ORDER_LIST_REQUEST:
      return { loading: true };
    case ADMIN_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ADMIN_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminOrderDetailsReducer = (
  state = { order: {}, loading: true },
  action
) => {
  switch (action.type) {
    case ADMIN_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ADMIN_ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ADMIN_ORDER_DETAILS_FAIL:
      return { loading: false, order: action.payload };
    default:
      return state;
  }
};
