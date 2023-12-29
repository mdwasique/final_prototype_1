import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { adminDetailsCourse } from "../actions/adminCourseActions";
import "./AdminCourseScreen.css";
import Axios from "axios";

const AdminCourseScreen = (props) => {
  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateAvailable, setUpdateAvailable] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = id;
  const adminCourseDetails = useSelector((state) => state.adminCourseDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, course, error } = adminCourseDetails;
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminDetailsCourse(courseId));
  }, [courseId, dispatch]);
  console.log(course);

  const updateCourseHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.put(
        `/api/admin/courses/update/${courseId}`,
        {
          updateName,
          updatePrice,
          updateCategory,
          updateDescription,
          updateAvailable,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("Updated Course:", response.data);
      alert("Course updated");

      // You can add logic to handle the updated course response
      setUpdateName("");
      setUpdatePrice("");
      setUpdateCategory("");
      setUpdateDescription("");
      setUpdateAvailable(true);
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error);
      // You can add logic to handle the error
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await Axios.delete(
          `/api/admin/courses/delete/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        console.log("Deleted Course:", response.data);
        alert("Course deleted successfully");
        navigate("/admin/allCourses"); // Redirect to the course list page after deletion
      } catch (error) {
        console.error("Error deleting course:", error);
        // You can add logic to handle the error
      }
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="main-container">
          <br />
          <div className="container-image">
            <h1>Update Course: {courseId}</h1>
            <br />
            <img src={course.image} alt={course.name} className="image" />
          </div>
          <div className="container-update">
            <form onSubmit={updateCourseHandler}>
              <div>
                <label htmlFor="updateName">
                  <strong>Update Name: </strong>
                </label>
                <input
                  type="text"
                  placeholder={course.name}
                  id="updateName"
                  required
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </div>
              <br />
              <br />
              <div>
                <label htmlFor="updatePrice">
                  <strong>Update Price: </strong>
                </label>
                <input
                  type="text"
                  placeholder={course.price}
                  id="updatePrice"
                  required
                  onChange={(e) => setUpdatePrice(e.target.value)}
                />
              </div>
              <br />
              <br />
              <div>
                <label htmlFor="updateCategory">
                  <strong>Update Category: </strong>
                </label>
                <select
                  id="updateCategory"
                  value={updateCategory}
                  onChange={(e) => {
                    setUpdateCategory(e.target.value);
                  }}
                >
                  <option key="coding" value="coding">
                    Coding
                  </option>
                  <option key="CLI" value="cli">
                    CLI
                  </option>
                  <option key="design" value="design">
                    Design
                  </option>
                </select>
              </div>
              <br />
              <br />
              <div>
                <label htmlFor="updateDescription">
                  <strong>Update Description: </strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter updated description.."
                  id="updateDescription"
                  required
                  onChange={(e) => setUpdateDescription(e.target.value)}
                />
              </div>
              <br />
              <br />
              <div>
                <label htmlFor="updateAvailable">
                  <strong>Available: </strong>
                </label>
                <select
                  id="updateAvailable"
                  value={updateAvailable}
                  onChange={(e) => {
                    setUpdateAvailable(e.target.value);
                  }}
                >
                  <option key={true} value={true}>
                    Yes
                  </option>
                  <option key={false} value="false">
                    No
                  </option>
                </select>
              </div>
              <br />
              <br />
              <div className="image-selector"></div>
              <div>
                <label />
                <button
                  style={{ backgroundColor: "green", color: "white" }}
                  type="submit"
                >
                  <strong>Update</strong>
                </button>
                &nbsp; &nbsp;
                <button
                  onClick={deleteHandler}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  <strong>Delete Course</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseScreen;
