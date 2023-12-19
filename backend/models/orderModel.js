import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        batch: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
    formDetails: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      adhaar: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    itemsPrice: { type: String, required: true },
    taxPrice: { type: String, required: true },
    totalPrice: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    joinedCourse: { type: Boolean, default: false },
    joinedCourseAt: { type: Date },
    courseCompleted: { type: Boolean, default: false },
    completeCourseAt: { type: Date },
  },
  {
    timeStamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
