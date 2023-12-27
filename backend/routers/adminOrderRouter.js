import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth, isAdminAuth } from "../utils.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get(
  "/",
  isAuth,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  })
);

adminOrderRouter.get(
  "/:id",
  isAuth,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

adminOrderRouter.put(
  "/:id",
  isAuth,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (order) {
      order.accepted = req.body.accepted || order.accepted;
      order.isPaid = req.body.isPaid || order.isPaid;
      order.joinedCourse = req.body.joinedCourse || order.joinedCourse;
      order.courseComplete = req.body.courseComplete || order.courseComplete;

      const updatedOrder = await order.save();
      res.send(updatedOrder);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

export default adminOrderRouter;
