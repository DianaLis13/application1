import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';

function Weather() {

  //Для вывода из хранилища
  const Mycity = useSelector(state => state.cityReducer.city);
  const API_KEY = useSelector(state => state.urlReducer.url);

  const [appState, setAppState] = useState();

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${Mycity}&appid=${API_KEY}&units=metric&lang=ru`;
    axios.get(apiUrl)
      .then((res) => {
        // console.log(res.data);
        let datesr = new Date((res.data.sys.sunset) * 1000);
        datesr = datesr.getHours() + ":" + datesr.getMinutes() + ":" + datesr.getSeconds();
        const data = {
          icon: res.data.weather[0].icon,
          city: res.data.name,
          country: res.data.sys.country,
          temp: (res.data.main.temp).toFixed(1),
          feelsLike: (res.data.main.feels_like).toFixed(0),
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          sunset: datesr,
          description: res.data.weather[0].description,
          clouds: res.data.clouds.all,
          wind: res.data.wind.speed,
        };
        setAppState(data);
      })
      .catch(err => {
        if (err.response) {
          // console.log("client received an error response (5xx, 4xx)");
          setAppState(undefined);
        } else if (err.request) {
          // console.log("client never received a response, or request never left");
          setAppState(undefined);
        } else {
          // console.log("anything else");
          setAppState(undefined);
        }
      })
  }, [Mycity]);

  return (
    <>
      {appState &&
        <section className="Main">
          <div className="weather__h">
            <div className="weather__title">
              <h2>{appState.city}, {appState.country}</h2>
              <p className="weather__sky">{appState.description}</p>
            </div>
            <img className="weather__img" src={`https://openweathermap.org/img/wn/${appState.icon}@2x.png`} alt="Weather icon" />
          </div>

          <div className="weather__m">
            <p className="weather__temp">{appState.temp}&#8451;</p>
            <div className="weather__details">
              <h3>Подробности</h3>
              <hr />
              <p>Ощющается как :  <span>{appState.feelsLike}&#8451;</span></p>
              <p>Влажность осадков : <span>{appState.humidity}%</span></p>
              <p>Давление : <span>{appState.pressure}гПа</span></p>
              <p>Заход солнца : <span>{appState.sunset}</span></p>
              <p>Облачность : <span>{appState.clouds}%</span></p>
              <p>Скорость ветра : <span>{appState.wind}м/с</span></p>
            </div>
          </div>
        </section>
      }

      {!appState &&
        <section className="Main">
          <h2>Пытаюсь найти заданый город...</h2>
        </section>
      }
    </>
  );
}

export default Weather;