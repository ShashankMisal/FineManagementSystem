import React from 'react'
import './Main.css'
import { Link } from 'react-router-dom'
import Zoom from '@material-ui/core/Zoom';
import { Button } from '@material-ui/core';


function Main() {


  return (
    <div className="main curved-div">
      <Zoom in>
        <h1 className="title unselectable"><span>Welcome To,</span><br /> Fine Management System</h1>
      </Zoom>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <Link to="/admin" style={{ textDecoration: "none" }}>
          <Button
            color="rgb(7 0 32)"
            style={{ backgroundColor: "#e0e0e0", marginLeft: "10px", fontWeight:"bold" }}
            size="small"
            aria-label="select merge strategy"
            aria-haspopup="menu"
          >
            ADMIN
          </Button>
        </Link>

        <Link to="/main" style={{ textDecoration: "none" }}>
          <Button
            color="rgb(7 0 32)"
            style={{ backgroundColor: "#e0e0e0", marginLeft: "10px", fontWeight: "bold" }}
            size="small"
            aria-label="select merge strategy"
            aria-haspopup="menu"
          >
            USER
          </Button>
        </Link>
      </div>


      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="rgb(7 0 32)" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,128C384,117,480,139,576,160C672,181,768,203,864,186.7C960,171,1056,117,1152,85.3C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>


    </div>
  )
}

export default Main
