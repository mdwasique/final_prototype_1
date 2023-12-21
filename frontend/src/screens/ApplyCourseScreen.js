import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const ApplyCourseScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.formDetails) {
    navigate("signin/form");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.price, 0));

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, success, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row top">
        <ul>
          <li>
            <div className="card-body card">
              <h1>Final Details:</h1>
              <p>
                <strong>Name:</strong>
                {cart.formDetails.fullName}
                <br />
                <br />
                <strong>Phone:</strong>
                {cart.formDetails.phone}
                <br />
                <br />
                <strong>Adhaar number:</strong>
                {cart.formDetails.adhaar}
                <br />
                <br />
                <strong>Address:</strong>
                {cart.formDetails.address},{cart.formDetails.city},
                <br />
                <br />
                <strong>Postal Code:</strong>
                {cart.formDetails.postalCode}
              </p>
            </div>
          </li>
          <li>
            <div className="card-body card">
              <h2>Courses</h2>
              <ul>
                {cart.cartItems.map((item) => (
                  <li key={item.course}>
                    <div className="row">
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="small"
                        />
                      </div>
                    </div>
                    <div className="min-30">
                      <Link to={`/course/${item.course}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <div className="col-1">
          <div className="card-body card">
            <ul>
              <li>
                <h2>Summary:</h2>
              </li>
              <li>
                <div className="row">
                  <div>Total Courses Price</div>
                  <div>Rs:{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>Rs:{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total:</strong>
                  </div>
                  <div>
                    <strong>Rs:{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="primary block"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Apply
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCourseScreen;
