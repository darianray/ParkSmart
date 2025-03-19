import React, { useState, useEffect } from "react";
import { mockVehicleHistory } from "./MockData"; // Import the mock data
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Checkmark from "../images/checkmark.png";
import Xsymbol from "../images/xsymbol.png";

export default function VehicleHistoryList() {
  const [vehicles, setVehicles] = useState(mockVehicleHistory); // Use mock data directly

  var symbol;
  var confidenceColor;
  var statusVehicle = "not found";

  useEffect(() => {
    // Simulate fetching data (for testing purposes)
    setVehicles(mockVehicleHistory);
  }, []);

  return (
    <div>
      <div className="container-fluid" id="vehicleHistoryContainer">
        <div className="row">
          {vehicles.map((val) => {
            if (val.entry === "true") {
              symbol = <img src={Checkmark} className="checksymbol" alt="ParkSmart Logo" />;
            } else {
              symbol = <img src={Xsymbol} className="xsymbol" alt="ParkSmart Logo" />;
            }


            if (val.entry === "true") {
              statusVehicle = "in";
            } else {
              statusVehicle = "out";
            }

            if (val.confidence < 30) {
              confidenceColor = "danger";
            } else if (val.confidence < 75 && val.confidence > 30) {
              confidenceColor = "warning";
            } else if (val.confidence > 75 && val.confidence <= 100) {
              confidenceColor = "success";
            }

            var formattedDate = "no date";
            if (val.stamp != null) {
              formattedDate = val.stamp.replace(/T/, " ").replace(/\..+/, "");
            }

            return (
              <div key={val.id}>
                <div id="vehicleHistory">
                  <Card id={confidenceColor}>
                    <Card.Body>
                      <Accordion>
                        <Card>
                          <Card.Header className="cardConfidence">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                              {symbol} License Number: {val.licenseNumber}
                            </Accordion.Toggle>
                          </Card.Header>

                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              Confidence: {val.confidence}
                              <br />
                              Time {statusVehicle}: {formattedDate}
                              <br />
                              Make: {val.make} <br />
                              Model: {val.model} <br />
                              Color: {val.color} <br />
                              Region: {val.licenseState}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
