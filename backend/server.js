import express from "express";
import mongoose from "mongoose";
import courseRouter from "./routers/courseRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting to MongoDB data base with mongoose
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/bdnt_tutorials_database",
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hi server is working");
});

// General error handling ,, always keep this middleware below all routes ,it is mandatory
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000; // connecting to a port local host

app.listen(port, () => {
  console.log(`server is working at port ${port}`);
});
