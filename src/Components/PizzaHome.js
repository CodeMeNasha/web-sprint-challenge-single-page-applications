import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pizza from "../images/Pizza.jpg";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({

    name: yup
    .string()
    .required("Please provide your full name"),

    email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Must include a valid email address")

})

const PizzaHome = () => {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
    });

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
            })
        })
        .catch((error) => {
            console.log(error.response)
        })
    }


  return (
    <>
      <img src={Pizza} />

      <form>
        <label>
          <input id="name" type="text" name="name"></input>
        </label>

        <label>
          <input id="email" type="text" name="email"></input>
        </label>

        <button>Order Now</button>
      </form>
    </>
  );
};
export default PizzaHome;
