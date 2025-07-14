import React from "react";

const Loader = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <img src="/img/jw_logo.png" alt="JW Logo" className="logo-pulse"/>
        <div className="shine"></div>
      </div>
      <p className="loading-text">Loading... Elegance is worth the wait.</p>
    </div>
  );
};

export default Loader;
