import { Route, useLocation } from "react-router-dom"; 
import {Detail, Form, Home, Landing } from "../src/views/index";
import NavBar from "./components/NavBar/NavBar";
import style from "./App.module.css";

function App() {
  const location = useLocation();

  return (
    <div className={style.App}>
      {location.pathname !=="/" && <NavBar />}
      <Route exact path="/" render={() => <Landing /> } />
      <Route path="/home" render={() => <Home /> } />
      <Route path="/detail/:id" render={() => <Detail /> } />
      <Route path="/create" render={() => <Form /> } />
    </div>
  );
}

export default App;