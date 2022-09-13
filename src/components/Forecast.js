import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import ForecastCard from "./ForecastCard";

function Forecast() {

  //Для вывода из хранилища
  const Mycity = useSelector(state => state.cityReducer.city);
  const API_KEY = useSelector(state => state.urlReducer.url);

  const [appState, setAppState] = useState();

  useEffect(() => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${Mycity}&appid=${API_KEY}&units=metric&lang=ru`;
    axios.get(apiUrl)
      .then((res) => {
        // console.log(res.data);
        let data = {
          city: res.data.city.name,
          country: res.data.city.country,
        };

        let list = [];
        for (let i = 0; i < res.data.list.length; i = i + 2) {
          let timeOfDay;
          switch ((res.data.list[i].dt_txt).substr(11, 2)) {
            case '00':
            case '03': timeOfDay = "ночь"; break;
            case '06':
            case '09': timeOfDay = "утро"; break;
            case '12':
            case '15': timeOfDay = "день"; break;
            case '18':
            case '21': timeOfDay = "вечер"; break;
          }
          let info = {
            timeOfDay: timeOfDay,
            day: (res.data.list[i].dt_txt).substr(8, 2),
            month: (res.data.list[i].dt_txt).substr(5, 2),
            hours: (res.data.list[i].dt_txt).substr(11, 2),
            temp: (res.data.list[i].main.temp).toFixed(0),
            feels_like: res.data.list[i].main.feels_like,
            description: res.data.list[i].weather[0].description,
            icon: res.data.list[i].weather[0].icon,
          };
          list.push(info);
        }

        data.list = list;
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
            </div>
          </div>

          <div className="Forecast">
            {(appState.list).map((item, index) =>
              <ForecastCard list={item} key={index} />
            )}
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

export default Forecast;