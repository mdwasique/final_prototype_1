import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { adminlistOrders } from "../actions/adminOrderActions";
import "./AdminAllOrdersScreen.css";
import AdminOrder from "../components/AdminOrder";

const AdminAllordersScreen = () => {
  const adminOrderList = useSelector((state) => state.adminOrderList);
  const { loading, error, orders } = adminOrderList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminlistOrders());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          {orders.map((order) => (
            <AdminOrder key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllordersScreen;
