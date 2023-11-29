"use client"
import React, { useState } from "react";
import BungalowConfig from "./BungalowConfig"

const Home: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState({
    bungalowType: undefined,
    cornerPlot: undefined,
    facingType: undefined,
    fillingDepth: undefined,
    builtUpArea: undefined,
    landArea: undefined,
  });
  const handleSelectValues = (values: {
    bungalowType: string | undefined;
    cornerPlot: string | undefined;
    facingType: string | undefined;
    fillingDepth: number | undefined;
    builtUpArea: number | undefined;
    landArea: number | undefined;
  }) => {
    setSelectedValues(values);
  };
 return (
  <div className="px-10 py-20 ">
    <h1 className="font-semibold text-4xl pb-10">Bungalow Pricing Calculator</h1>
      <BungalowConfig onSelectValues={handleSelectValues} />
    <div>
      <p>Selected Bungalow Type: {selectedValues.bungalowType}</p>
      <p>Selected Corner Plot: {selectedValues.cornerPlot}</p>
      <p>Selected Facing Type: {selectedValues.facingType}</p>
      <p>Selected Facing Type: {selectedValues.fillingDepth}</p>
      <p>Selected Facing Type: {selectedValues.builtUpArea}</p>
      <p>Selected Facing Type: {selectedValues.landArea}</p>
    </div>
  </div>
  // Base Price
  // Depends on Bungalow Category and associated markup
  // Base Builtup Rate x (Built Up Area + Additional Built Up Area)
  // Land Price
  // Current Land Rate x Land Area x Land Value Sell Factor
  // Corner Charge
  // If Corner Plot, add 1% of Base Price
  // Facing Charge
  // If Facing East, add 5% of Base Price
  // If Facing North, add 3%
  // If Facing South, add 2%
  // If Facing West, add 4%
  // Remoteness Charge
  // Remoteness Factor x Base Price
  // Project Management Charge
  // 10% of (Base Price + Land Price + Corner Charge + Facing Charge + Remoteness Charge)
  // Grand Total Price = Base Price + Land Price + Corner Charge + Facing Charge + Remoteness Charge + Project Management Charge

  
);
};
export default Home;
