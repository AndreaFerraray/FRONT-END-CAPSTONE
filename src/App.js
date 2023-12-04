import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavScrollExample from "./component/Navbar";
import NavBar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Campeggi from "./component/Campeggi";
import Home from "./component/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import Register from "./component/Register";
import Login from "./component/Login";
import tt from "@tomtom-international/web-sdk-maps";
import MapComponent from "./component/MapComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campeggi" element={<Campeggi />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route patch="/discover" element={<MapComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
