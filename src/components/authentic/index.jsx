import React, {useContext} from "react";
//import "./style.css";
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { authentic } from "../../services/auth";
import {UserContext} from "../../contexts/user";

export default function Authentic() {
  const [ setUser]=useContext(UserContext).user;

  const Authenticate= async()=>{
    let authent=await authentic();
    if(authent) setUser(authent);
  };

  return (
    <div className="signInBtn" onClick={Authenticate}>
      <Button variant="contained" style={{ backgroundColor: green[500], color: green[50] }}>
        Authenticate
      </Button>
    </div>
  );
}