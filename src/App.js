import React from "react";
import { Route, Switch } from 'react-router-dom';
import PizzaForm from "./Components/PizzaForm"
import PizzaHome from "./Components/PizzaHome"


const App = () => {

  return (
    <>
      <h1>Lambda Eats</h1>
      
     <Switch>

     <Route path="/pizza/">
        <PizzaForm />
      </Route>

      <Route path="/">
        <PizzaHome />
      </Route>

     
      </Switch>
      
    </>
  );
};
export default App;