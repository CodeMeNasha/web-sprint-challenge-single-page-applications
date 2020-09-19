import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

const formSchema = yup.object().shape({
  sauce: yup.string().required("select a sauce"),

  pepperoni: yup.string().required("select a topping"),

  garlic: yup.string().required("select a topping"),

  extraCheese: yup.string().required("select a topping"),
});

const FormHeader = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 13%;
color: #3d040b;
`;

const PizzaForm = (props) => {
  const [formState, setFormState] = useState({
    sauce: "",
    pepperoni: "",
    garlic: "",
    extraCheese: "",
  });

  const [errors, setErrors] = useState({
    sauce: "",
    pepperoni: "",
    garlic: "",
    extraCheese: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((error) => {
        setErrors({
          ...errors,
          [event.target.name]: error.errors[0],
        });
      });
  };

  const [order, setOrder] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/", formState)
      .then((response) => {
        setOrder(response.data);

        setFormState({
          sauce: "",
          pepperoni: "",
          garlic: "",
          extraCheese: "",
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };

  return (
    <>
      <FormHeader>
        <h2> Order Form</h2>
        <div className="home-button">
        <Link to="/">
          <button >Home</button>
        </Link>
        </div>
      </FormHeader>

      <form onSubmit={submitForm} className="form-container">
        <label htmlFor="sauce">
          Sauce Required
          <select id="sauce" name="Sauce" onChange={inputChange}>
            <option value="">--Select a Sauce--</option>
            <option value="small">Tomato</option>
            <option value="medium">Chunky Tomato</option>
            <option value="large">Garlic and Oil</option>
          </select>
        </label>

        <label htmlFor="toppings-header">Choose Up To 3 Toppings</label>
        <label htmlFor="pepperoni" className="toppings">
          Peppperoni
          <input
            type="checkbox"
            name="pepperoni"
            checked={formState.pepperoni}
            onChange={inputChange}
          />
        </label>

        <label htmlFor="garlic" className="toppings">
          garlic
          <input
            type="checkbox"
            name="garlic"
            checked={formState.garlic}
            onChange={inputChange}
          />
            <label htmlFor="sausage" className="toppings">
          Extra Cheese
          <input
            type="checkbox"
            name="extraCheese"
            checked={formState.extraCheese}
            onChange={inputChange}
          />
        </label>
        </label>
        <button
          disabled={buttonDisabled}
          type="submit"
          data-cy="submit-order-button"
        >
          Add to order
        </button>

        
      </form>
      <pre>
        <h3>Order Summary:</h3>

        <br />
        {JSON.stringify(order, null, 2)}
        <p>Congrats! Pizza is on it's way</p>
        <p>An order confirmation was emailed to you</p>
      </pre>
      <br />
      <br />
      <Link to="/">
        <button
          disabled={submitForm}
          type="submit"
          data-cy="track-order-button"
        >
          Submit
        </button>
      </Link>
    </>
  );
};
export default PizzaForm;
