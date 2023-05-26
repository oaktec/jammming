import React from "react";
import "./css/Tracklist.css";
import SearchResults from "./SearchResults";

const Tracklist = () => {
  return (
    <section className="Tracklist result-block">
      <h2>Results</h2>
      <SearchResults />
    </section>
  );
};

export default Tracklist;