import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { adminListCourses } from "../actions/adminCourseActions";
import AdminCourse from "../components/AdminCourse";

export default function AdminAllCoursesScreen() {
  const adminCourseList = useSelector((state) => state.adminCourseList);
  const { loading, error, courses } = adminCourseList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminListCourses());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="">
          {courses.map((course) => (
            <AdminCourse key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
