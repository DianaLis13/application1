import React from "react";

function Main() {
    return (
        <section className="Main">
            <div className="weather__h">
                <div className="weather__title">
                    <h2>О проекте</h2>
                </div>
            </div>

            <div className="weather__details Air">
                <h3>SPA приложение - Прогноз погоды</h3>
                <hr />
                <p>Приложение создано в рамках задачи по разработке на React для Frontend-стажировки в Lad.</p>
                <p>Предназначено для второго и заключительного отбора на стажировку.</p>
            </div>
        </section>
    );
}

export default Main;