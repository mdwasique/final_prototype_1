// LandingPage.js
import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div className="landing-page">
      <header className="header">
        {/* <h1>
          <strong className="strong">Bdnt Tutorials</strong>
        </h1>
        <p>
          <strong className="strong">Your gateway to quality education</strong>
        </p> */}
      </header>

      <section className="features">
        <div className="feature">
          <h2>Learn Anytime, Anywhere</h2>
          <p>Access our courses from the comfort of your home.</p>
        </div>

        <div className="feature">
          <h2>Expert Instructors</h2>
          <p>Learn from experienced and knowledgeable instructors.</p>
        </div>

        <div className="feature">
          <h2>Wide Range of Courses</h2>
          <p>Explore diverse topics and enhance your skills.</p>
        </div>
      </section>

      <section className="cta">
        <p>Ready to start learning? Join Bdnt Tutorials today!</p>
        {!userInfo && (
          <Link to="/register">
            <button>Sign Up Now</button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
