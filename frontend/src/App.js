import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AllCoursesScreen from "./screens/AllCoursesScreen";
import CourseScreen from "./screens/CourseScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import FormScreen from "./screens/FormScreen";
import ApplyCourseScreen from "./screens/ApplyCourseScreen";
import OrderScreen from "./screens/OrderScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              <strong>Bdnt Acadamey</strong>
            </Link>
          </div>
          <div className="cart-profile-flex">
            <Link to="/courses">
              <strong>All Courses</strong>
            </Link>
            <Link to="/cart">
              <strong>Cart</strong>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo && userInfo.name ? (
              <div className="dropdown">
                <Link to="/profile">
                  <strong>{userInfo.name}</strong>
                </Link>
                {/* <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
                 <i className="fa fa-caret-down"></i> */}
              </div>
            ) : (
              <Link to="/signin">
                <strong>SignIn</strong>
              </Link>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/profile" element={<MyProfileScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="signin/form" element={<FormScreen />}></Route>
            <Route path="register/form" element={<FormScreen />}></Route>
            <Route path="/apply" element={<ApplyCourseScreen />}></Route>
            <Route path="/course/:id" element={<CourseScreen />}></Route>
            <Route path="/cart/:id?" element={<CartScreen />}></Route>
            <Route path="/order/:id?" element={<OrderScreen />}></Route>
            <Route path="/courses" element={<AllCoursesScreen />}></Route>
            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>

        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
