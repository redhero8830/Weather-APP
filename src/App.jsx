import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./components/Weather";
import WeatherButton from "./components/WeatherButton";
// const API_KEY = process.env.REACT_WEATHER_APP_API_KEY;
const API_KEY ="efe4d7a2f0e343f771fa802e8f58c432"

export default function App() {
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    setWeather(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []); // []이면 componentDidMount()처럼 작동 -> 렌더하고 바로 실행

  return (
    <div>
      <div className="container">
        <Weather weather={weather} />
        <WeatherButton />
      </div>
    </div>
  );
}

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태 정보가 들어감.
// 3. 5개의 버튼(1개는 현재 위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 작동
