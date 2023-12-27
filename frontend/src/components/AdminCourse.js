import React from "react";
import "./adminCourse.css";
import { Link } from "react-router-dom";

export default function AdminCourse(props) {
  const { course } = props;

  return (
    <div key={course._id} className="course-container">
      <div className="img-container">
        <Link to={`/course/${course._id}`}>
          <img src={course.image} alt={course.name} />
        </Link>
      </div>

      <div className="details-container">
        <p className="courseId">
          <strong>Course id: {course._id}</strong>
        </p>
        <Link to={`/course/${course._id}`}>
          <strong className="courseName">{course.name}</strong>
        </Link>
        <div>
          <br />
          {course.available ? (
            <span className="success">Available</span>
          ) : (
            <span className="danger">Unavailable</span>
          )}
        </div>
        <div className="status-container">
          <Link to={`/admincourse/${course._id}`}>
            <h5>
              <em>Tap to edit</em>
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
