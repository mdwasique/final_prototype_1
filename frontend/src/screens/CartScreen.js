import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

const CartScreen = (props) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const courseId = id;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const batch = searchParams.get("batch") || "morning";

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(addToCart(courseId, batch));
    }
  }, [batch, courseId, dispatch]);

  const removeFromCartHandler = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=form");
  };

  return (
    <div>
      <div className="row top">
        <div className="col-2">
          <h1>Cart Items</h1>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty.. <Link to="/courses">Get Course</Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.course}>
                  <div className="row">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div className="min-30">
                      <Link to={`/course/${item.course}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </div>
                    <div>
                      <select
                        value={item.batch}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.course, String(e.target.value))
                          )
                        }
                      >
                        <option key="morning" value="morning">
                          Morning
                        </option>
                        <option key="evening" value="evening">
                          Evening
                        </option>
                      </select>
                    </div>
                    <div>
                      <strong>Rs:{item.price}</strong>
                    </div>
                    <div>
                      <button
                        className="danger"
                        type="button"
                        onClick={() => removeFromCartHandler(item.course)} //
                      >
                        <strong>Delete</strong>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Number of Courses applied: {""}
                  {cartItems.length} <br /> <br /> Total Amount: Rs.{""}
                  {cartItems.reduce((a, c) => a + c.price, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  <strong>Proceed to Checkout</strong>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
