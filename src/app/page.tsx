
"use client"
import React, { useState } from "react";
import BungalowConfig from "./BungalowConfig";

const Home: React.FC = () => {
  return (
    <div className="px-10 py-20 ">
      <h1 className="font-semibold text-2xl md:text-4xl">
        Bungalow Pricing Calculator
      </h1>
      <div className=" py-10 justify-center">
        <BungalowConfig/>
      </div>
    </div>
  );
};

export default Home;
