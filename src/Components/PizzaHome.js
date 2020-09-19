import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pizza from "../images/Pizza.jpg";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Please provide your full name"),

  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Must include a valid email address"),
});

const PizzaHome = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
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

  const [name, setName] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/", formState)
      .then((response) => {
        setName(response.data);

        setFormState({
          name: "",
          //no email here
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
          [event.target.name]: event.target.value,
      }
      validateChange(event);
      setFormState(newFormData)
  }

  return (
    <>
      <img src={Pizza} />

      <form onSubmit={submitForm}>
        <label>
          <input id="name" type="text" name="name" value={formState.name} onChange={inputChange}></input>
        </label>

        <label>
          <input id="email" type="text" name="email" value={formState.email} onChange={inputChange}></input>
        </label>

        <Link to="/PizzaForm">
          <button disabled={buttonDisabled} type="submit">
            Order Now
          </button>
        </Link>
      </form>
    </>
  );
};
export default PizzaHome;
