import { useState } from "react";
import "./weatherApp.css";
const WeatherApp = () => {
  const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "a03deb55e0c27aeb43fd27db0820046a";
  const DIFF_KELVIN = 273.15;

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
    
  };
  
  const handleCityChange = (event)=>{
    setCity(event.target.value)
  };
  const fetchWeather = async()=>{
    try {
        const response = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}&lang=es`);
        const data = await response.json();
        setWeatherData(data);

    } catch (error) {
      console.error('Ha habido un error: ', error)
    }

  };

  return (
    <>
      <div className="container">
        <h1>Aplicación de Clima</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Ingrese una ciudad.." 
          value={city}
          onChange={handleCityChange}/>

          <button type="submit">Buscar</button>
        </form>
         {weatherData && (

            <div>
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <p>La temperatura actual es  {Math.floor(weatherData.main.temp - DIFF_KELVIN)} °C</p>
              <p>La condición meteorológica actual es: {weatherData.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
            </div>

         )}
      </div>
    </>
  );
};

export default WeatherApp;
