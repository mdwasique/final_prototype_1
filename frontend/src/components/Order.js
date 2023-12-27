import React from "react";
import { Link } from "react-router-dom";

export default function Course(props) {
  const { order } = props;

  return (
    <div key={order._id} className="card">
      <div className="card-body">
        <Link to={`/admin/order/${order._id}`}>
          <h2>Order id:{order._id}</h2>
        </Link>
        <h2>User id:{order.user}</h2>
        <h2>Name:{order.formDetails.fullName}</h2>
        {order.isPaid ? <h1>Paid</h1> : <h1>Unpaid</h1>}

        {/* <div className="rating">{course.rating}</div> */}
      </div>
    </div>
  );
}
