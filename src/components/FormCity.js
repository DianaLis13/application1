import React from "react";
import { useDispatch } from 'react-redux';
import { updCity } from '../reducers/cityReducer';

function FormCity() {

    let refCity = React.createRef();
    const dispatch = useDispatch();

    let getCity = () => {
        let cityValue = refCity.current.value;
        dispatch(updCity(cityValue));
    }

    return (
        <>
            <section className="City">
                <p>Введите&nbsp;ваш&nbsp;город: </p>
                <input type="text" name="city1" placeholder="Город" ref={refCity} />
                <button onClick={getCity}>Ввести&nbsp;город</button>
            </section>
        </>
    );
}

export default FormCity;