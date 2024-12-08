import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Home.css";
import { log10 } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [locations, setLocations] = useState([]);
  const [forecast, setForecast] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  console.log(API_KEY);
   

  useEffect(() => {
    if (!city) return;

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      )
      .then((result) => {
        setWeather(result.data);
      })
      .catch((err) => {
        console.error("Error fetching current weather:", err);
      });
  }, [city]);


  useEffect(() => {
    if (!city) return;

    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
      )
      .then((result) => {
        setForecast(result.data);
      })
      .catch((err) => {
        console.error("Error fetching forecast:", err);
      });
  }, [city]);

  
  const getLocationSuggestions = (e) => {
    const query = e.target.value;
    if (!query) return;

    axios
      .get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
      )
      .then((result) => {
        setLocations(result.data);
      })
      .catch((err) => {
        console.error("Error fetching location suggestions:", err);
      });
  };

  const chartData = {
    labels: forecast
      ? forecast.forecast.forecastday.map((day) => day.date)
      : [], 
    datasets: [
      {
        label: "Max Temp (°C)",
        data: forecast
          ? forecast.forecast.forecastday.map((day) => day.day.maxtemp_c)
          : [], 
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        tension: 0.4,
      },
      {
        label: "Min Temp (°C)",
        data: forecast
          ? forecast.forecast.forecastday.map((day) => day.day.mintemp_c)
          : [], 
        borderColor: "#3498DB",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `7-Day Weather Forecast for ${forecast?.location?.name || ""}`,
      },
    },
  };

  return (
    <div className="home">
      <div className="container">
        <div className="left-section">
          <div className="search-card">
            <input
              type="search"
              placeholder="Enter city name"
              onChange={getLocationSuggestions}
            />
          </div>

         
          <div className="location-card">
            {locations.map((obj) => (
              <div key={obj.id} className="location-suggestions">
                <h1 onClick={() => setCity(obj.name)}>{obj.name}</h1>
              </div>
            ))}
          </div>

         
          {weather && (
            <div className="weather-card">
              <div className="weather-card">
                <img
                  src={weather.current?.condition.icon}
                  alt="weather icon"
                  className="info-img"
                />
                <h2>{weather.current?.condition.text}</h2>
                <h2>{weather.current?.temp_c}°C</h2>
                <h2>{weather.location?.name}</h2>
              </div>
            </div>
          )}

          {/* <div>
            <select
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="location-select"
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((obj) => (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        <div className="right-section">
          <div className="chart-card">
            {forecast ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <p>Loading forecast data...</p>
            )}
          </div>
          
        </div>
      </div>

     
      {forecast && (
        <div className="forecast-card">
          <h1>Weather Forecast for {forecast.location.name}</h1>
          <h2>
            {forecast.location.region}, {forecast.location.country}
          </h2>
          <ul>
            {forecast.forecast.forecastday.map((day) => (
              <li key={day.date}>
                <p>
                  <strong>Date:</strong> {day.date}
                </p>
                <p>
                  <strong>Condition:</strong> {day.day.condition.text}
                </p>
                <p>
                  <strong>Max Temp:</strong> {day.day.maxtemp_c}°C
                </p>
                <p>
                  <strong>Min Temp:</strong> {day.day.mintemp_c}°C
                </p>
                <p>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                  />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
