import React, { useState } from "react";
import "./css/LoginArea.css";

const LoginArea = ({ login }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const handleLoginClick = () => {
    setLoggingIn(true);
    login();
  };

  return (
    <section className="LoginArea">
      {loggingIn ? (
        <div className="LoggingIn">Logging in...</div>
      ) : (
        <button onClick={handleLoginClick} className="LoginButton">
          LOGIN TO SPOTIFY
        </button>
      )}
    </section>
  );
};

export default LoginArea;
