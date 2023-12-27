import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="profile-section">
      <div className="profile-container">
        <h1>My Profile</h1>
        {userInfo && userInfo.role === "admin" && (
          <div>
            <br />
            <br />
            <Link to="/adminDashBoard">
              <strong>Admin Dashboard</strong>
            </Link>
          </div>
        )}
        <br />
        <br />
        {userInfo && (
          <>
            <div className="user-details">
              <div className="user-name">
                <strong>Name:</strong> <strong>{userInfo.name}</strong>
              </div>
              <br />
              <div className="user-email">
                <strong>Email:</strong> <strong>{userInfo.email}</strong>
              </div>
              <br />
              <div className="user-phone">
                <strong>Phone Number:</strong> <strong>{userInfo.phone}</strong>
              </div>
              <br />
              <br />
              <div className="sign-out-btn">
                <button className="btn" onClick={signoutHandler}>
                  <strong>Sign Out</strong>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
