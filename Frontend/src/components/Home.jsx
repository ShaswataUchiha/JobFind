import React from "react";
import Navbar from "./shareable/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-red-500 text-3xl text-center my-6"> This is Home Page</h1>
    </div>
  );
};

export default Home;
