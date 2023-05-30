import React from "react";
import "./css/LoginArea.css";

const LoginArea = ({ login }) => {
  return (
    <section className="LoginArea">
      <button onClick={login} className="LoginButton">
        LOGIN TO SPOTIFY
      </button>
    </section>
  );
};

export default LoginArea;
