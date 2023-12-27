import React from "react";
import { Link } from "react-router-dom";

export default function Course(props) {
  const { course } = props;

  return (
    <div key={course._id} className="card">
      <Link to={`/course/${course._id}`}>
        {/* image size should be 680px by 830px */}
        <img className="medium" src={course.image} alt={course.name} />
      </Link>
      <div className="card-body">
        <Link to={`/course/${course._id}`}>
          <h2>{course.name}</h2>
        </Link>
        {/* <div className="rating">{course.rating}</div> */}
        <div className="price">Rs:{course.price}</div>
      </div>
    </div>
  );
}
