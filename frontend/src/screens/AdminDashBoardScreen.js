import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashBoardScreen() {
  return (
    <div>
      <Link to="/admin/allCourses">
        <h1>All Admin Courses</h1>
      </Link>
      <Link to="/admin/allOrders">
        <h1>All Admin Orders</h1>
      </Link>
    </div>
  );
}
