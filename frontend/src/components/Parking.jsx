import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import Navigation from "./Navigation";
import LauraLander from "../images/ll.jpg";
import { Button } from "react-bootstrap";
import ParkSmartBanner from "./ParkSmartBanner2.png";
import Card from "react-bootstrap/Card";
import { mockParkingInfo } from "./MockData"; // Import the mock data

function Parking() {
  var percentage;
  var info;
  
  const [parking, setParking] = useState(mockParkingInfo);
  const getParkingData = async () => {
    try {
      const userParking = await axios.get(
        "http://www.landerparking.com:3002/api/getparking"
      );
      setParking(userParking.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getParkingData();
    //getCount()
    const interval = setInterval(() => {
      getParkingData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="parking" style={{ border: "1px solid #cecece" }}>
      <div class="container" id="parkingHeader">
        <Button disabled={true} id="logoContainer">
          <img
            src={ParkSmartBanner}
            className="ParkSmartBanner"
            alt="ParkSmartBanner"
          />
        </Button>
      </div>
      <Navigation />
      <div className="container">
        <div className="row align-items-top my-5">
          <div className="col-lg-6">
            <img
              className="img-fluid"
              src={LauraLander}
              alt="Laura Lander"
              id="lauraLander"
            />
          </div>

          <div className="col-lg-5">
            <Card></Card>
            <h1 className="font-weight-light">Laura Lander</h1>
            {parking.map((val) => {
              percentage = Math.round((100 / val.numSpots) * val.numUsed);
              if (percentage < 50) {
                info = "success";
              } else if (percentage > 50 && percentage < 70) {
                info = "warning";
              } else if (percentage > 70 && percentage <= 100) {
                info = "danger";
              }
              return (
                <div className="parking-lot" key={val.parkingLotKey}>
                  <h4>
                    There are a total of {val.numSpots} parking spots in the{" "}
                    {val.name} lot.
                  </h4>
                  <br></br>
                  <h4>
                    Currently, there are {val.numUsed} spots available.<br></br>
                  </h4>
                  <ProgressBar
                    animated
                    now={percentage}
                    variant={info}
                    label={`${percentage}%`}
                    max={100}
                  />
                </div>
              );
            })}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Parking;
