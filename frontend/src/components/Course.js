import React from "react";

export default function Course(props) {
  const { course } = props;

  return (
    <div key={course._id} className="card">
      <a href={`course/${course._id}`}>
        {/* image size should be 680px by 830px */}
        <img className="medium" src={course.image} alt={course.name} />
      </a>
      <div className="card-body">
        <a href={`course/${course._id}`}>
          <h2>{course.name}</h2>
        </a>
        {/* <div className="rating">{course.rating}</div> */}
        <div className="price">Rs:{course.price}</div>
      </div>
    </div>
  );
}
