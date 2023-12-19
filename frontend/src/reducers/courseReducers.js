import Axios from "axios";
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
} from "../constants/courseConstants";

export const courseListReducer = (
  state = { loading: true, courses: [] },
  action
) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true };
    case COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload };
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseDetailsReducer = (
  state = { course: {}, loading: true },
  action
) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true };
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };
    case COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
