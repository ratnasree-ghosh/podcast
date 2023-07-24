import React, { useState } from "react";
import Header from "../components/commonComp/Header/index";
// import InputComponenet from "../components/commonComp/Input";
// import Button from "../components/commonComp/Button/index";
import SignUpForm from "../components/signupComp/SignUpForm";
import LoginForm from "../components/signupComp/LoginForm";
import "../index.css";

const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>{!flag ? "Signup" : "Login"}</h1>
        {!flag ? <SignUpForm /> : <LoginForm />}

        <p onClick={() => setFlag(!flag)}>
          {!flag
            ? "Already Have An Account? Click Here To Login."
            : "Don't have an Account? Click Here To Signup"}
        </p>
      </div>
    </div>
  );
};
export default SignUp;
