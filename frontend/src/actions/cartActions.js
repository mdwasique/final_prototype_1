import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_FORM_DETAILS,
} from "../constants/cartConstants";

export const addToCart = (courseId, batch) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/courses/${courseId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      available: data.available,
      course: data._id,
      batch: batch,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (courseId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: courseId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveFormDetails = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_FORM_DETAILS, payload: data });
  localStorage.setItem("formDetails", JSON.stringify(data));
};
