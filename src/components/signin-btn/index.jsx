import React, { useContext } from "react";
//import "./style.css";
import Button from "@material-ui/core/Button";
import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../contexts/user";

export default function SignInBtn() {
  const [setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let signInByUser = await signInWithGoogle();
    if (signInByUser) setUser(signInByUser);
  };

  return (
    <div className="signInBtn" onClick={signInBtnClick}>
      <Button variant="contained" color="secondary">
        Sign-In with Google
      </Button>
    </div>
  );
}
