import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { adminDetailsOrder } from "../actions/adminOrderActions";
import Axios from "axios";
import "./AdminOrderScreen.css"; // Import the CSS file for styling

const AdminOrderScreen = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = id;
  const userSignin = useSelector((state) => state.userSignin);
  const adminOrderDetails = useSelector((state) => state.adminOrderDetails);
  const { userInfo } = userSignin;
  const { loading, order, error } = adminOrderDetails;
  const dispatch = useDispatch();
  const [isPaid, setIsPaid] = useState(false);
  const [joinedCourse, setJoinedCourse] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    dispatch(adminDetailsOrder(orderId));
  }, [dispatch, orderId]);

  const updateOrderHandler = async (e) => {
    e.preventDefault();
    console.log("isPaid:", isPaid);
    console.log("accepted:", accepted);
    console.log("joinedCourse:", joinedCourse);
    console.log("courseCompleted:", courseCompleted);

    try {
      const response = await Axios.put(
        `/api/admin/orders/${orderId}`,
        {
          isPaid,
          accepted,
          joinedCourse,
          courseCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (response.data) {
        console.log("Order updated:", response.data);
        alert("Order Updated");
        // navigate(window.location.pathname, { replace: true });
        window.location.reload();
      } else {
        console.error("Failed to update order");
        alert("Failed to Update Order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) {
    return <LoadingBox />;
  }

  if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }

  if (!order) {
    return <MessageBox variant="danger">Order not found</MessageBox>;
  }

  return (
    <div className="admin-order-container">
      <strong>Order ID:</strong> {order._id}
      <br />
      <div className="order-details">
        <div className="form-details">
          <h2>Form Details:</h2>
          <p>
            <strong>Student id:</strong> {order.user}
          </p>
          <p>
            <strong>Full Name:</strong> {order.formDetails.fullName}
          </p>
          <p>
            <strong>Address:</strong> {order.formDetails.address}
          </p>
          <p>
            <strong>Phone:</strong> {order.formDetails.phone}
          </p>
          <p>
            <strong>City:</strong> {order.formDetails.city}
          </p>
          <p>
            <strong>Postal Code:</strong> {order.formDetails.postalCode}
          </p>
          <p>
            <strong>Adhaar:</strong> {order.formDetails.adhaar}
          </p>
        </div>
        <br />
        <br />
        <h1>Order details:</h1>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Items Price:</strong> Rs:{order.itemsPrice}
        </p>
        <p>
          <strong>Tax Price:</strong> Rs:{order.taxPrice}
        </p>
        <p>
          <strong>Total Price:</strong> Rs:{order.totalPrice}
        </p>
        <div className="order_info">
          <div>
            <strong>Paid:</strong>{" "}
            {order.isPaid ? (
              <span className="success">
                <strong>Yes</strong>
              </span>
            ) : (
              <span className="danger">
                <strong>No</strong>
              </span>
            )}
          </div>
        </div>
        <div className="order_info">
          <div>
            <strong>Accepted:</strong>{" "}
            {order.accepted ? (
              <span className="success">
                <strong>Yes</strong>
              </span>
            ) : (
              <span className="danger">
                <strong>No</strong>
              </span>
            )}
          </div>
        </div>
        <div className="order_info">
          <div>
            <strong>Joined Course:</strong>{" "}
            {order.joinedCourse ? (
              <span className="success">
                <strong>Yes</strong>
              </span>
            ) : (
              <span className="danger">
                <strong>No</strong>
              </span>
            )}
          </div>
        </div>
        <div className="order_info">
          <div>
            <strong>Course Complete:</strong>{" "}
            {order.courseCompleted ? (
              <span className="success">
                <strong>Yes</strong>
              </span>
            ) : (
              <span className="danger">
                <strong>No</strong>
              </span>
            )}
          </div>
        </div>
        <br />
        <br />{" "}
        <div>
          <form onSubmit={updateOrderHandler}>
            <h1>Update Details</h1>
            <br />
            <div>
              <label htmlFor="updatePaid">
                <strong>Update Paid: </strong>
              </label>
              <select
                id="updatePaid"
                value={isPaid}
                onChange={(e) => {
                  setIsPaid(e.target.value);
                }}
              >
                <option value="">Select--</option>
                <option key={true} value={true}>
                  Yes
                </option>
                <option key={false} value={false}>
                  No
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="updateAccepted">
                <strong>Update Accepted: </strong>
              </label>
              <select
                id="updateAccepted"
                value={accepted}
                onChange={(e) => {
                  setAccepted(e.target.value);
                }}
              >
                <option value="">Select--</option>
                <option key={true} value={true}>
                  Yes
                </option>
                <option key={false} value={false}>
                  No
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="updateJoinedCourse">
                <strong>Update Joined Course: </strong>
              </label>
              <select
                id="updateJoinedCourse"
                value={joinedCourse}
                onChange={(e) => {
                  setJoinedCourse(e.target.value);
                }}
              >
                <option value="">Select--</option>
                <option key={true} value={true}>
                  Yes
                </option>
                <option key={false} value={false}>
                  No
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="updateCourseComplete">
                <strong>Update Course Completed: </strong>
              </label>
              <select
                id="updateCourseComplete"
                value={courseCompleted}
                onChange={(e) => {
                  setCourseCompleted(e.target.value);
                }}
              >
                <option value="">Select--</option>
                <option key={true} value={true}>
                  Yes
                </option>
                <option key={false} value={false}>
                  No
                </option>
              </select>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                <strong>Update</strong>
              </button>
            </div>
          </form>
        </div>
        <br />
        <br />
        <h1>Courses details:</h1>
        <strong>
          {order.orderItems.map((item) => (
            <div key={item._id}>
              <h2>Course id: {item.course}</h2>
              <h2>Course name: {item.name}</h2>
              <h2>Course batch: {item.batch}</h2>
            </div>
          ))}
        </strong>
      </div>
    </div>
  );
};

export default AdminOrderScreen;
