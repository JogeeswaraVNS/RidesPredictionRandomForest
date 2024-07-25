import React from "react";
import { Container, Navbar } from "react-bootstrap";

function ProjectNavbar() {
  return (
    <div>
      {/* <Navbar style={{backgroundColor:'red'}} className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Rides Demand Forecasting</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar> */}

      <div className="navbar bg-dark">
        <div className="py-2 container-fluid">
          <a className="navbar-brand" href="/">
            <h5 className="ms-1 text-white">Rides Price Prediction</h5>
          </a>


        </div>
      </div>
    </div>
  );
}

export default ProjectNavbar;
