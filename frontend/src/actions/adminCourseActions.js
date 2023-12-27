import Axios from "axios";
import {
  ADMIN_COURSE_LIST_REQUEST,
  ADMIN_COURSE_LIST_SUCCESS,
  ADMIN_COURSE_LIST_FAIL,
  ADMIN_COURSE_DETAILS_REQUEST,
  ADMIN_COURSE_DETAILS_SUCCESS,
  ADMIN_COURSE_DETAILS_FAIL,
} from "../constants/adminCourseConstants";

export const adminListCourses = () => async (dispatch, getState) => {
  dispatch({ type: ADMIN_COURSE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/admin/courses", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADMIN_COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADMIN_COURSE_LIST_FAIL, payload: message });
  }
};

export const adminDetailsCourse = (courseId) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_COURSE_DETAILS_REQUEST, payload: courseId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/admin/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ADMIN_COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
