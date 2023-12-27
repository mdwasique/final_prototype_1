import {
  ADMIN_COURSE_LIST_REQUEST,
  ADMIN_COURSE_LIST_SUCCESS,
  ADMIN_COURSE_LIST_FAIL,
  ADMIN_COURSE_DETAILS_REQUEST,
  ADMIN_COURSE_DETAILS_SUCCESS,
  ADMIN_COURSE_DETAILS_FAIL,
} from "../constants/adminCourseConstants";

export const adminCourseListReducer = (
  state = { loading: true, courses: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_COURSE_LIST_REQUEST:
      return { loading: true };
    case ADMIN_COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload };
    case ADMIN_COURSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminCourseDetailsReducer = (
  state = { course: {}, loading: true },
  action
) => {
  switch (action.type) {
    case ADMIN_COURSE_DETAILS_REQUEST:
      return { loading: true };
    case ADMIN_COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };
    case ADMIN_COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
