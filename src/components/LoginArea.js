import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import "./css/LoginArea.css";

const LoginArea = ({ login }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const handleLoginClick = () => {
    setLoggingIn(true);
    login();
  };

  return (
    <section className="login-area">
      {loggingIn ? (
        <p>
          Logging in...
          <LoadingSpinner />
        </p>
      ) : (
        <button onClick={handleLoginClick} className="login-btn">
          LOGIN TO SPOTIFY
        </button>
      )}
    </section>
  );
};

export default LoginArea;
