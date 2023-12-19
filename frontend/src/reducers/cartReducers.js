import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_FORM_DETAILS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.course === item.course);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.course === existItem.course ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.course !== action.payload),
      };

    case CART_SAVE_FORM_DETAILS:
      return {
        ...state,
        formDetails: action.payload,
      };

    case CART_EMPTY:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
