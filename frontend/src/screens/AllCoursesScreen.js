import React, { useEffect } from "react";
import Course from "../components/Course";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listCourses } from "../actions/courseActions";

export default function AllCoursesScreen() {
  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses } = courseList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="row center">
          {courses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
