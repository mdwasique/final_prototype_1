import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { adminDetailsOrder } from "../actions/adminOrderActions";
import "./AdminOrderScreen.css"; // Import the CSS file for styling

const AdminOrderScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = id;
  const adminOrderDetails = useSelector((state) => state.adminOrderDetails);
  const { loading, order, error } = adminOrderDetails;
  const dispatch = useDispatch();
  const [isPaid, setIsPaid] = useState(false);
  const [joinedCourse, setJoinedCourse] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  useEffect(() => {
    dispatch(adminDetailsOrder(orderId));
  }, [dispatch, orderId]);

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
            <strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}
          </div>
          <div>
            <strong>updatePaid</strong>
          </div>
        </div>
        <div className="order_info">
          <div>
            <strong>Accepted:</strong> {order.accepted ? "Yes" : "No"}
          </div>
          <div>
            <strong>updateAccepted:</strong>
          </div>
        </div>
        <div className="order_info">
          <div>
            <strong>Joined Course:</strong> {order.joinedCourse ? "Yes" : "No"}
          </div>
          <div>
            <strong>update Joined Course:</strong>
          </div>
        </div>
        <div className="order_info">
          <div>
            <strong>Course Complete:</strong>{" "}
            {order.courseCompleted ? "Yes" : "No"}
          </div>
          <div>
            <strong>update Course Complete:</strong>
          </div>
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
