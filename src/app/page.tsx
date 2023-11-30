
"use client"
import React, { useState } from "react";
import BungalowConfig from "./BungalowConfig";

const Home: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState({
    bungalowType: undefined,
    cornerPlot: undefined,
    facingType: undefined,
    fillingDepth: undefined,
    builtUpArea: undefined,
    landArea: undefined,
    totalLandArea: undefined,
    totalBuiltUpArea: undefined,
    numberOfFloors: undefined,
    baseBuiltupRate: undefined,
    landRateAtPurchase: undefined,
  });

  const handleSelectValues = (values: {
    bungalowType: string | undefined;
    cornerPlot: string | undefined;
    facingType: string | undefined;
    fillingDepth: number | undefined;
    builtUpArea: number | undefined;
    landArea: number | undefined;
    totalLandArea: number | undefined;
    totalBuiltUpArea: number | undefined;
    numberOfFloors: number | undefined;
    baseBuiltupRate: number | undefined;
    landRateAtPurchase: number | undefined;
  }) => {
    setSelectedValues(values);
  };

  // Constants for charges
  let sellFactor = 0.2;
  let developmentCharge = 200;
  let legalCharge = 200;
  let AdditionalLandArea = 1700;
  let AdditionalBuiltUpArea = 1000;

  let currentLandRate = selectedValues.landRateAtPurchase
    ? selectedValues.landRateAtPurchase * (1 + sellFactor)
    : null;


  let NetSellingLandPrice =
    currentLandRate ? (currentLandRate + developmentCharge + legalCharge) : null;

  let landPrice =
    NetSellingLandPrice && selectedValues.totalLandArea? NetSellingLandPrice *
    (AdditionalLandArea + selectedValues.totalLandArea + legalCharge): null;

  let baserateWithFlooraAddition = selectedValues.baseBuiltupRate?
    selectedValues.baseBuiltupRate *
    (1 + 0.05 * Math.max(selectedValues.numberOfFloors! - 3, 0)): null;

  let buildingPrice =selectedValues.baseBuiltupRate?
    selectedValues.baseBuiltupRate *
    (AdditionalBuiltUpArea + selectedValues.builtUpArea!): null;

  let cornerFactor = 0.01;
  let facing = 0.05;

  let subTotal = landPrice && buildingPrice? (landPrice + buildingPrice): null;

  let fillingRate = 100;
  let fillingCharge = selectedValues.fillingDepth
    ? selectedValues.fillingDepth * fillingRate
    : 0;

  let facingCharge = subTotal * facing;
  let cornerCharge = subTotal * cornerFactor;
  let remotenessCharge = 100;

  let grandTotal = subTotal + cornerCharge + facingCharge + fillingCharge + remotenessCharge;
  return (
    <div className="px-10 py-20">
      <h1 className="font-semibold text-4xl">
        Bungalow Pricing Calculator
      </h1>
      <div className=" py-10 justify-center">
        <BungalowConfig onSelectValues={handleSelectValues} />
      </div>
      <div>
        <h3>Current Land Price: {currentLandRate ? currentLandRate : 0}</h3>
        <h3>Net Selling Land Price: {NetSellingLandPrice ? NetSellingLandPrice : 0}</h3>
        <h3>Land Price: {landPrice ? landPrice : 0}</h3>
        <h3>Base rate with floor addition: {baserateWithFlooraAddition ? baserateWithFlooraAddition : 0}</h3>
        <h3>Base price: {buildingPrice ? buildingPrice : 0}</h3>
        <h3>Sub Total: {subTotal ? subTotal : 0}</h3>
        <h3>Corner Charge: {cornerCharge ? cornerCharge : 0}</h3>
        <h3>Facing Charge: {facingCharge ? facingCharge : 0}</h3>
        <h3>Grand Total: {grandTotal ? grandTotal : 0}</h3>

      </div>
    </div>
  );
};

// Export the Home component
export default Home;
