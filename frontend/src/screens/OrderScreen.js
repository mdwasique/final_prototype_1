import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useParams } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";

export default function OrderScreen(props) {
  const { id } = useParams();
  const orderId = id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!userInfo) {
    navigate("/signin");
  }

  useEffect(() => {
    if (!order) {
      dispatch(detailsOrder(orderId));
    } else {
      console.log("order check");
    }
  }, [dispatch, order, orderId]);

  const successHandler = () => {
    alert("successfully applied ");
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="background">
          <h1>Course ID {order._id}</h1>
          <div className="row top">
            <ul>
              <li>
                <div className="card-body card">
                  <h2>Your Course Details</h2>
                  <p>
                    <strong>Name:</strong>
                    {order.formDetails.fullName}
                    <br />
                    <strong>Your Address:</strong>
                    {order.formDetails.address},{order.formDetails.city},
                    {order.formDetails.postalCode}
                    <br />
                    <strong>Phone:</strong>
                    {order.formDetails.phone}
                    <br />
                    <strong>Adhaar no:</strong>
                    {order.formDetails.adhaar}
                  </p>
                  <strong>Paid:</strong>
                  {order.isPaid ? (
                    <MessageBox variant="success">Yes</MessageBox>
                  ) : (
                    <MessageBox variant="danger">No</MessageBox>
                  )}
                </div>
              </li>
              <li>
                <div className="card-body card">
                  <h2>Applied Courses</h2>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.course}>
                        <div className="row">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            />
                          </div>
                          <div className="min-30">
                            <Link to={`/course/${item.course}`}>
                              <strong>{item.name}</strong>
                            </Link>
                          </div>
                          <div>
                            <strong>
                              Batch:
                              {item.batch}
                              <br />
                              Rs: {item.price}
                            </strong>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <div className="col-1">
              <div className="card-body card">
                <ul>
                  <li>
                    <h2>Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>Rs:{order.itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>Rs:{order.taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Order Total:</strong>
                      </div>
                      <div>
                        <strong>Rs:{order.totalPrice}</strong>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="welcome">
                      <h1>
                        <strong>Welcome to Bdnt tutorials</strong>
                      </h1>
                    </div>
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
