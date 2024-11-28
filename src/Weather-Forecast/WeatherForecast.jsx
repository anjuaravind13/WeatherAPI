import axios, { Axios } from "axios";
import React, { useEffect } from "react";

function WeatherForecast() {

  
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=0175a578e1814927859162140241211&q=London&days=2&aqi=yes&alerts=yes`
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <div>Weather-Forecast</div>;
}

export default WeatherForecast;


// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom/client";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Home.css";
// //0175a578e1814927859162140241211

// function Home() {
//   const [city, setCity] = useState("london");
//   const [weather, setWeather] = useState({});
//   const [search, setSearch] = useState(true);
//   const [locations, setLocations] = useState([]);
//   const [forecast, setForecast] = useState(null);

//   useEffect(() => {
//     axios
//       .get(
//         `http://api.weatherapi.com/v1/current.json?key=0175a578e1814927859162140241211&q=${city}`
//       )
//       .then((result) => {
//         console.log(result);
//         setWeather(result.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [city, search]);

//   function getLocation(e) {
//     const query = e.target.value;
//     console.log(query);

//     axios
//       .get(
//         `http://api.weatherapi.com/v1/search.json?key=0175a578e1814927859162140241211&q=${query}`
//       )
//       .then((result) => {
//         console.log(result);
//         setLocations(result.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   useEffect(() => {
//     axios
//       .get(
//         `https://api.weatherapi.com/v1/forecast.json?key=0175a578e1814927859162140241211&q=${city}&days=7`
//       )
//       .then((result) => {
//         console.log(result);
//         setForecast(result.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   return (
//     <div>
//       <div className="container">
//         <div className="search">
//           <input
//             type="search"
//             placeholder="Enter city name"
//             onChange={getLocation}
//           />
//           {/* <button onClick={() => setSearch(!search)}>
//             <i className="fa-solid fa-magnifying-glass">Search</i>
//           </button> */}
//         </div>

//         <div className="location-suggestions">
//           {locations.map((obj) => {
//             return (
//               <div key={obj.id}>
//                 <h1 onClick={() => setCity(obj.name)}>{obj?.name}</h1>
//               </div>
//             );
//           })}
//         </div>

//         <div className="location-suggestions">
//           <select
//             onChange={(e) => setCity(e.target.value)}
//             value={city}
//             className="location-select"
//           >
//             <option value="" disabled>
//               Select a location
//             </option>
//             {locations.map((obj) => (
//               <option key={obj.id} value={obj.name}>
//                 {obj.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="weather-info">
//           <div className="info">
//             <img
//               src={weather.current?.condition.icon}
//               alt="weather icon"
//               className="info-img"
//             />
//             <h2>{weather.current?.condition.text}</h2>
//             <h2>{weather.current?.temp_c}°C</h2>
//             <h2>{weather.current?.name}</h2>
//           </div>
//         </div>

//         <div>
//           <h1>Weather Forecast for {forecast.location.name}</h1>
//           <h2>
//             {forecast.location.region}, {forecast.location.country}
//           </h2>
//           <ul>
//             {forecast.forecast.forecastday.map((day) => (
//               <li key={day.date}>
//                 <p>
//                   <strong>Date:</strong> {day.date}
//                 </p>
//                 <p>
//                   <strong>Condition:</strong> {day.day.condition.text}
//                 </p>
//                 <p>
//                   <strong>Max Temp:</strong> {day.day.maxtemp_c}°C
//                 </p>
//                 <p>
//                   <strong>Min Temp:</strong> {day.day.mintemp_c}°C
//                 </p>
//                 <p>
//                   <img
//                     src={day.day.condition.icon}
//                     alt={day.day.condition.text}
//                   />
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
        
//       </div>
//     </div>
//   );
// }
// export default Home;

