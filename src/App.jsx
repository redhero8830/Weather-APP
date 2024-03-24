import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";
import Weather from "./components/Weather";
import WeatherButton from "./components/WeatherButton";
const API_KEY = "efe4d7a2f0e343f771fa802e8f58c432";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

const cities = ["Seoul", "Tokyo", "New York", "London", "Barcelona", "Paris"];

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(""); //setCity(null)이 아님
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeatherByCurrentLocation(latitude, longitude);
      });
    };
    const getWeatherByCity = async () => {
      const url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` //city는 state
      );
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    };

    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);
  // []이면 componentDidMount()처럼 작동 -> 렌더하고 바로 실행
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1 className="title">☀️ WEATHER ARE YOU? 🌧️</h1>
      {loading ? (
        <div className="container">
          <ClipLoader
            loading={loading}
            cssOverride={override}
            size={368}
          />
        </div>
      ) : (
        <div className="container">
          <WeatherButton
            cities={cities}
            setCity={setCity}
            city={city}
            handleCityChange={handleCityChange}
          />
          <div id="earth"></div>
          <Weather weather={weather} />
        </div>
      )}
    </div>
  );
}

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태 정보가 들어감.
// 3. 5개의 버튼(1개는 현재 위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 작동
