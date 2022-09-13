import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';

function AirPollution() {

    //Для вывода из хранилища
    const Mycity = useSelector(state => state.cityReducer.city);
    const API_KEY = useSelector(state => state.urlReducer.url);

    const [appState, setAppState] = useState();

    useEffect(() => {
        let lat = null,
            lon = null,
            name = null,
            country = null;
        const GeocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${Mycity}&limit=5&appid=${API_KEY}`;
        axios.get(GeocodingUrl)
            .then((res) => {
                name = res.data[0].local_names.ru;
                country = res.data[0].country;
                lat = res.data[0].lat;
                lon = res.data[0].lon;

                const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
                axios.get(apiUrl).then((res) => {
                    // console.log(res.data.list[0]);
                    let quality;
                    switch (res.data.list[0].main.aqi) {
                        case 1: quality = "хорошо"; break;
                        case 2: quality = "средне"; break;
                        case 3: quality = "Удовлетворительно"; break;
                        case 4: quality = "плохо"; break;
                        case 5: quality = "очень плохо"; break;
                    }

                    const data = {
                        city: name,
                        country: country,
                        quality: quality,
                        index: res.data.list[0].main.aqi,
                        co: res.data.list[0].components.co,
                        nh3: res.data.list[0].components.nh3,
                        no: res.data.list[0].components.no,
                        no2: res.data.list[0].components.no2,
                        o3: res.data.list[0].components.o3,
                        pm2_5: res.data.list[0].components.pm2_5,
                        pm10: res.data.list[0].components.pm10,
                        so2: res.data.list[0].components.so2,
                    };
                    setAppState(data);
                })
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
                            <p className="weather__sky">Индекс качества воздуха: {appState.index} ({appState.quality})</p>
                        </div>
                        <img className="weather__img" src={`https://openweathermap.org/img/wn/10n@2x.png`} alt="Weather icon" />
                    </div>

                    <div className="weather__details Air">
                        <h3>Подробности</h3>
                        <hr />
                        <p>Концентрация СО ( окиси углерода ) :  <span>{appState.co}мкг/м 3</span></p>
                        <p>Концентрация NO ( азота монооксида ) : <span>{appState.no}мкг/м 3</span></p>
                        <p>Концентрация NO 2 ( двуокись азота ) : <span>{appState.no2}мкг/м 3</span></p>
                        <p>Концентрация O 3 ( озона ) : <span>{appState.o3}мкг/м 3</span></p>
                        <p>Концентрация SO 2 ( сернистого газа ) : <span>{appState.so2}мкг/м 3</span></p>
                        <p>Концентрация РМ 2,5 ( мелкодисперсное вещество ) : <span>{appState.pm2_5}мкг/м 3</span></p>
                        <p>Концентрация РМ 10 ( крупнодисперсных частиц ) : <span>{appState.pm10}мкг/м 3</span></p>
                        <p>Концентрация NH 3 ( аммиака ) : <span>{appState.nh3}мкг/м 3</span></p>
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

export default AirPollution;