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
import "@tomtom-international/web-sdk-maps/dist/maps.css";

import tt from "@tomtom-international/web-sdk-maps";
import MapComponent from "./component/MapComponent";
import Auth from "./component/Auth";
import Profilo from "./component/Profilo";
import Logout from "./component/Logout";
import Preferiti from "./component/Preferiti";

import Prenotazioni from "./component/Prenotazioni";
import Campeggio from "./component/Campeggio";
import CampeggiCercati from "./component/CampeggiCercati";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <BrowserRouter className="route">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/campeggi" element={<Campeggi />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/discover" element={<MapComponent />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profilo />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/preferiti" element={<Preferiti />} />
          <Route path="/prenotazioni" element={<Prenotazioni />} />
          <Route path="/campeggio" element={<Campeggio />} />
          <Route path="/campeggiCercati" element={<CampeggiCercati />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
