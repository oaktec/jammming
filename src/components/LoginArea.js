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
        <div class="loading-msg">
          Logging in...
          <LoadingSpinner />
        </div>
      ) : (
        <button onClick={handleLoginClick} className="login-btn">
          LOGIN TO SPOTIFY
        </button>
      )}
    </section>
  );
};

export default LoginArea;
