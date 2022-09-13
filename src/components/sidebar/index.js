import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Weather from "../Weather";
import Main from "../Main";
import AirPollution from "../AirPollution";
import Forecast from "../Forecast";
import Error from "../Error";
import './style.css';

function Sidebar() {
    return (
        <>
            <Router>
                <nav className="Sidebar">
                    <ul>
                        <li><NavLink to="/">Главная</NavLink></li>
                        <li><NavLink to="/weather">Погода</NavLink></li>
                        <li><NavLink to="/air_pollution">Воздух</NavLink></li>
                        <li><NavLink to="/forecast">Прогноз</NavLink></li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/air_pollution" element={<AirPollution />} />
                    <Route path="/forecast" element={<Forecast />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </>
    );
}

export default Sidebar;