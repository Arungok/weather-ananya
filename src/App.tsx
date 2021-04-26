import React, { useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
  const inputEl = useRef(null);
  const [city, setCity] = useState("Bangalore, india");
  const [data, setData] = useState({
    city: "Bangalore",
    temp: "",
    humidity: "",
    icon: "02d",
  });

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9749a71b92c8765b1c2f732d5249fce3`
    )
      .then((res: any) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((res: any) => {
        setData({
          city: res?.name,
          temp: res?.main?.temp,
          humidity: res?.main?.humidity,
          icon: res?.weather[0]?.icon || "02d",
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [city]);

  return (
    <div className="weather">
      <div className="weather-wrapper">
        <div className="weather-header">
          <input
            className="search-input"
            spellCheck="false"
            type="text"
            placeholder="Enter city name"
            ref={inputEl}
            onKeyPress={(e) => {
              const ele: any = e.target;
              if (e.which === 13 && ele.value && ele.value.length > 2) {
                setCity(ele.value);
                ele.blur();
              }
            }}
          />
          <i
            className="search-icon"
            onClick={(e) => {
              const ele: any = inputEl.current;
              if (ele.value && ele.value.length > 2) {
                setCity(ele.value);
                ele.blur();
              }
            }}
          ></i>
        </div>
        <div className="weather-body">
          <div className="weather-city">
            <span className="city-name">{data.city}</span>
            <img
              src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
              className="weather-icon"
            />
          </div>
          <div className="weather-details">
            <div className="weather-details-temp">{data.temp}°</div>
            <div className="weather-details-prct">{data.humidity}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
