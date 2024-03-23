import React from "react";

export default function Weather({ weather }) {
  console.log(weather);
  return (
    <div className="weather-box">
      <h1>{weather?.name}</h1>
      {/* 삼항연산자 (옵셔닝체이닝?) */}
      {/* <h1>{weather && weather.name}</h1>  */}
      {/* useEffect는 첫 번째 UI가 한 번 그려지고 작동 -> 처음 값 null */}
      <h2>{`${weather?.main?.temp} 도 / ${
        weather?.main?.temp * 1.8 + 32
      } 화씨`}</h2>
      <h3>{weather?.weather[0]?.description}</h3>
    </div>
  );
}
