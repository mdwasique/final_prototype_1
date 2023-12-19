import express from "express";
import expressAsyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import data from "../data.js";

const courseRouter = express.Router();

//fetching all available courses from a data base to frontend
courseRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const courses = await Course.find({});
    res.send(courses);
  })
);

//Basically we are adding all available courses to the data base if we hit /seed  route
courseRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Course.remove({}); //be-carefull to use uncomment this. This removes created courses in data base and repopulated it again
    const createdCourses = await Course.insertMany(data.courses);
    res.send({ createdCourses });
  })
);

courseRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

export default courseRouter;
