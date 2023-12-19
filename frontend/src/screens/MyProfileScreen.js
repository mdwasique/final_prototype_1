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
        {userInfo && (
          <>
            <div className="user-details">
              <div className="user-name">
                <strong>Name:</strong> {userInfo.name}
              </div>
              <div className="user-email">
                <strong>Email:</strong> {userInfo.email}
              </div>
              <div className="user-phone">
                <strong>Phone Number:</strong> {userInfo.phone}
              </div>
              <div className="user-order">
                <Link to="/your-orders">Your Orders</Link>
              </div>
              <div className="sign-out-btn">
                <button className="btn" onClick={signoutHandler}>
                  Sign Out
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
