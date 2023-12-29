import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashBoardScreen() {
  return (
    <div>
      <Link to="/admin/allCourses">
        <h1>All Courses</h1>
      </Link>
      <Link to="/admin/allOrders">
        <h1>All Orders</h1>
      </Link>
    </div>
  );
}
