import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { saveFormDetails } from "../actions/cartActions";

const FormScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { formDetails } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, []);

  const [fullName, setFullName] = useState(formDetails.fullName);
  const [address, setAddress] = useState(formDetails.address);
  const [phone, setPhone] = useState(formDetails.phone);
  const [city, setCity] = useState(formDetails.city);
  const [postalCode, setPostalCode] = useState(formDetails.postalCode);
  const [adhaar, setAdhaar] = useState(formDetails.adhaar);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveFormDetails({ fullName, address, phone, city, postalCode, adhaar })
    );
    navigate("/apply");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>Form Details</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            placeholder="Enter Phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="Enter City"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="adhaar">Adhaar</label>
          <input
            type="text"
            placeholder="Enter Adhaar"
            id="adhaar"
            value={adhaar}
            onChange={(e) => setAdhaar(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            placeholder="Enter Postal Code"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormScreen;
