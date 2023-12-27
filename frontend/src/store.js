import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import {
  courseDetailsReducer,
  courseListReducer,
} from "./reducers/courseReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";
import {
  adminCourseDetailsReducer,
  adminCourseListReducer,
} from "./reducers/adminCourseReducers";
import {
  adminOrderListReducer,
  adminOrderDetailsReducer,
} from "./reducers/adminOrderReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    formDetails: localStorage.getItem("formDetails")
      ? JSON.parse(localStorage.getItem("formDetails"))
      : {},
  },
};

const reducer = combineReducers({
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  adminCourseList: adminCourseListReducer,
  adminCourseDetails: adminCourseDetailsReducer,
  adminOrderList: adminOrderListReducer,
  adminOrderDetails: adminOrderDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
