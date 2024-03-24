import React from "react";
import { Button } from "react-bootstrap";

export default function WeatherButton() {
  return (
    <div>
      <Button variant="warning">Current Location</Button>{" "}
      <Button variant="warning">Seoul</Button>{" "}
      <Button variant="warning">New York</Button>{" "}
      <Button variant="warning">London</Button>{" "}
      <Button variant="warning">Barcelona</Button>{" "}
    </div>
  );
}
