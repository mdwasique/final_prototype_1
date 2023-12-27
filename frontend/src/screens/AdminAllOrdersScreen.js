import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { adminlistOrders } from "../actions/adminOrderActions";
import Order from "../components/Order";
import "./AdminAllOrdersScreen.css";

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
        <div className="row center">
          {orders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllordersScreen;
