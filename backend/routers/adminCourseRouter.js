// adminRouter.js
import express from "express";
import { isAdminAuth, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

const adminCourseRouter = express.Router();

// Define admin-specific routes
adminCourseRouter.get(
  "/",
  isAuth,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.user.role === "admin") {
      const courses = await Course.find({});
      res.send(courses);
    } else {
      res
        .status(400)
        .send({ message: "User is not an admin or invalid Token" });
    }
  })
);

adminCourseRouter.get(
  "/:id",
  isAuth,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.user.role === "admin") {
      const course = await Course.findById(req.params.id);
      if (course) {
        res.send(course);
      } else {
        res.status(404).send({ message: "Course not Found.." });
      }
    } else {
      res
        .status(400)
        .send({ message: "User is not an admin or invalid Token" });
    }
  })
);

adminCourseRouter.put(
  "/update/:id",
  isAuth,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (course) {
      course.name = req.body.updateName || course.name;
      course.price = req.body.updatePrice || course.price;
      course.category = req.body.updateCategory || course.category;
      course.description = req.body.updateDescription || course.description;
      course.available = req.body.updateAvailable || course.available;

      const updatedCourse = await course.save();
      res.send(updatedCourse);
    } else {
      res.status(404).send({ message: "Course not found" });
    }
  })
);

// adminRouter.js

// ... (other imports and code)

adminCourseRouter.delete(
  "/delete/:id",
  isAuth,
  isAdminAuth,
  expressAsyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (course) {
      await course.remove();
      res.send({ message: "Course deleted successfully" });
    } else {
      res.status(404).send({ message: "Course not found" });
    }
  })
);

export default adminCourseRouter;
