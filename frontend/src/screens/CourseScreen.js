import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsCourse } from "../actions/courseActions";

export default function CourseScreen(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = id;
  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, course, error } = courseDetails;
  const dispatch = useDispatch();
  const [batch, setBatch] = useState("morning");

  //   const course = data.courses.find((x) => x._id === id);
  //   if (!course) {
  //     return <div>Product not found</div>;
  //   }
  useEffect(() => {
    dispatch(detailsCourse(courseId));
  }, [dispatch, courseId]);

  const addToCartHandler = () => {
    navigate(`/cart/${courseId}?batch=${batch}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          <br />
          <Link to="/">
            <strong>Back to Courses</strong>
          </Link>
          <div className="row">
            <div className="col-2">
              <img src={course.image} alt={course.name} className="large" />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{course.name}</h1>
                </li>
                <li>
                  <h1>rating: {course.rating}</h1>
                </li>
                <li>
                  <h2>
                    price: Rs:{""}
                    {course.price}
                  </h2>
                </li>
                <li>
                  <strong>
                    Description:
                    <p>{course.description}</p>
                  </strong>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">Rs{course.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                    </div>
                    <br />
                    <div>
                      {course.available ? (
                        <span className="success">Available</span>
                      ) : (
                        <span className="danger">Unavailable</span>
                      )}
                    </div>
                  </li>
                  {course.available && (
                    <>
                      <li>
                        <div className="row">
                          <div>Batch</div>
                          <select
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                          >
                            <option key="morning" value="morning">
                              Morning
                            </option>
                            <option key="evening" value="evening">
                              Evening
                            </option>
                          </select>
                        </div>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      disabled={course.available === false}
                      className="primary block"
                      onClick={addToCartHandler}
                    >
                      Add to Cart{" "}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
