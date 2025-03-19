import React, { useState } from "react";
import CurrentVehicleList from "./CurrentVehiclesList";
import VehicleHistoryList from "./VehicleHistoryList";
import Navigation from "./Navigation";
import { Button, ToggleButton, ToggleButtonGroup, Container } from "react-bootstrap";
import ParkSmartBanner from "./ParkSmartBanner2.png";

export default function Violations() {
  const [view, setView] = useState("currentVehicles");

  return (
    <div className="violations-container">
      {/* Header Section */}
      <div className="container" id="parkingHeader">
          <Button disabled={true} id="logoContainer">
            <img src={ParkSmartBanner} className="ParkSmartBanner" alt="ParkSmartBanner" />
          </Button>
        </div>

      {/* Navigation Bar */}
      <Navigation />

      {/* Toggle Switch for Viewing Current Vehicles or History */}
      <Container className="toggle-container">
      <ToggleButtonGroup type="radio" name="viewOptions" value={view} onChange={setView}>
        <ToggleButton id="toggle-current" value="currentVehicles" className="custom-toggle-btn">
          Current Vehicles
        </ToggleButton>
        <ToggleButton id="toggle-history" value="vehicleHistory" className="custom-toggle-btn">
          Vehicle History
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>

      {/* Render the Selected Component */}
      <Container className="content-section">
        {view === "currentVehicles" && <CurrentVehicleList />}
        {view === "vehicleHistory" && <VehicleHistoryList />}
      </Container>
    </div>
  );
}
