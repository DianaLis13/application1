function ForecastCard(props) {

    return (
        <div className="card">
            <div className="card__title">
                <h3>{props.list.day}.{props.list.month}</h3>
                <p>{props.list.timeOfDay}</p>
            </div>

            <div className="card__details">
                <img className="weather__img" src={`https://openweathermap.org/img/wn/${props.list.icon}@2x.png`} alt="Weather icon" />
                <p className="card__description">{props.list.description}</p>
                <p className="card__temp">{props.list.temp}&#8451;</p>
            </div>
        </div>
    );
}

export default ForecastCard;