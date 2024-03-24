import React from "react";
// import { Button } from "react-bootstrap";

export default function WeatherButton({
  cities,
  setCity,
  city,
  handleCityChange,
}) {
  return (
    <div className="menu-container">
      <button
        className={`buttons ${city === "" ? "focus-btn" : "normal-btn"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </button>
      {cities.map((item, index) => (
        <button
          key={index}
          className={`buttons ${city === item ? "focus-btn" : "normal-btn"}`}
          onClick={() => setCity(item)}
        >
          {item}
        </button>
      ))}
      ;
    </div>
  );
}
