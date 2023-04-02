import React, { useEffect, useState } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Delhi");

  //   to add weather info data in state Variable
  const [tempInfo, setTempInfo] = useState({})  

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=60ab5c63b7463d235db0cd46f0c21d18`;

      const res = await fetch(url);
      const data = await res.json();
      //   console.log(data);

      // obj destructuring
      const { temp, pressure, humidity } = data.main;
      // console.log(temp)

      const { main: weathermood } = data.weather[0];

      const { name } = data;
    //   console.log(name);
      const { speed } = data.wind;
      //   console.log(speed);
      //   console.log(main);

      const { country, sunset } = data.sys;

      //   creating obj
      const myNewWeatherInfo = {
        temp,
        name,
        humidity,
        pressure,
        weathermood,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <Weathercard tempInfo={tempInfo}></Weathercard>
    </>
  );
};
export default Temp;
