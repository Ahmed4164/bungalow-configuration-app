"use client"
import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

const BungalowConfig: React.FC = () => {
    const [selectedBungalowType, setSelectedBungalowType] = React.useState<string | undefined>(undefined);
    const [selectedFacingType, setSelectedFacingType] = React.useState<string | undefined>(undefined);
    const [selectedCornerPlot, setSelectedCornerPlot] = React.useState<string | undefined>(undefined);
    const [fillingDepth, setFillingDepth] = React.useState<number | undefined>(undefined);
    const [builtUpArea, setBuiltUpArea] = React.useState<number | undefined>(undefined);
    const [landArea, setLandArea] = React.useState<number | undefined>(undefined);
    const [totalLandArea, setTotalLandArea] = React.useState<number | undefined>(undefined);
    const [totalBuiltUpArea, setTotalBuiltUpArea] = React.useState<number | undefined>(undefined);
    const [numberOfFloors, setNumberOfFloors] = React.useState<number | undefined>(undefined);
    const [baseBuiltupRate, setBaseBuiltupRate] = React.useState<number | undefined>(undefined);
    const [landRateAtPurchase, setLandRateAtPurchase] = React.useState<number | undefined>(undefined);

    const [currentLandRate, setCurrentLandRate] = React.useState<number | null>(null);
    const [NetSellingLandPrice, setNetSellingLandPrice] = React.useState<number | null>(null);
    const [landPrice, setLandPrice] = React.useState<number | null>(null);
    const [baserateWithFlooraAddition, setBaserateWithFlooraAddition] = React.useState<number | null>(null);
    const [buildingPrice, setBuildingPrice] = React.useState<number | null>(null);
    const [subTotal, setSubTotal] = React.useState<number | null>(null);
    const [cornerCharge, setCornerCharge] = React.useState<number | null>(null);
    const [facingCharge, setFacingCharge] = React.useState<number | null>(null);
    const [grandTotal, setGrandTotal] = React.useState<number | null>(null);
    const handleFormSubmit = () => {
        let sellFactor = 0.2;
        let developmentCharge = 200;
        let legalCharge = 200;
        let AdditionalLandArea = 1700;
        let AdditionalBuiltUpArea = 1000;

        let currentLandRate = landRateAtPurchase
            ? landRateAtPurchase * (1 + sellFactor)
            : null;

        let NetSellingLandPrice =
            currentLandRate ? currentLandRate + developmentCharge + legalCharge : null;

        let landPrice =
            NetSellingLandPrice && totalLandArea
                ? NetSellingLandPrice * (AdditionalLandArea + totalLandArea + legalCharge)
                : null;

        let baserateWithFlooraAddition = baseBuiltupRate
            ? baseBuiltupRate * (1 + 0.05 * Math.max(numberOfFloors! - 3, 0))
            : null;

        let buildingPrice = baseBuiltupRate
            ? baseBuiltupRate * (AdditionalBuiltUpArea + builtUpArea!)
            : null;

        let cornerFactor = 0.01;
        let facing = 0.05;

        let subTotal = landPrice && buildingPrice ? landPrice + buildingPrice : null;

        let fillingRate = 100;
        let fillingCharge = fillingDepth ? fillingDepth * fillingRate : 0;

        let facingCharge = subTotal * facing;
        let cornerCharge = subTotal * cornerFactor;
        let remotenessCharge = 100;

        let grandTotal =
            subTotal + cornerCharge + facingCharge + fillingCharge + remotenessCharge;
        setCurrentLandRate(currentLandRate);
        setNetSellingLandPrice(NetSellingLandPrice);
        setLandPrice(landPrice);
        setBaserateWithFlooraAddition(baserateWithFlooraAddition);
        setBuildingPrice(buildingPrice);
        setSubTotal(subTotal);
        setCornerCharge(cornerCharge);
        setFacingCharge(facingCharge);
        setGrandTotal(grandTotal);
        console.log("Grand Total:", grandTotal);
    };
    const handleFormReset = () => {
        setSelectedBungalowType(undefined);
        setSelectedCornerPlot(undefined);
        setSelectedFacingType(undefined);
        setFillingDepth(undefined);
        setBuiltUpArea(undefined);
        setLandArea(undefined);
        setTotalLandArea(undefined);
        setTotalBuiltUpArea(undefined);
        setNumberOfFloors(undefined);
        setBaseBuiltupRate(undefined);
        setLandRateAtPurchase(undefined);
        setCurrentLandRate(null);
        setNetSellingLandPrice(null);
        setLandPrice(null);
        setBaserateWithFlooraAddition(null);
        setBuildingPrice(null);
        setSubTotal(null);
        setCornerCharge(null);
        setFacingCharge(null);
        setGrandTotal(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center py-6">
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Bungalow Type</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-full my-2 justify-start" asChild>
                                    <Button variant="outline">{selectedBungalowType || 'Select Bungalow Type'}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className=" ">
                                    <DropdownMenuLabel>Select Bungalow Type</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                        checked={selectedBungalowType === 'Raw'}
                                        onCheckedChange={() => setSelectedBungalowType('Raw')}
                                    >
                                        Raw
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedBungalowType === 'Economy'}
                                        onCheckedChange={() => setSelectedBungalowType('Economy')}
                                    >
                                        Economy
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedBungalowType === 'Deluxe'}
                                        onCheckedChange={() => setSelectedBungalowType('Deluxe')}
                                    >
                                        Deluxe
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedBungalowType === 'Super Deluxe'}
                                        onCheckedChange={() => setSelectedBungalowType('Super Deluxe')}
                                    >
                                        Super Delux
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedBungalowType === 'Luxury'}
                                        onCheckedChange={() => setSelectedBungalowType('Luxury')}
                                    >
                                        Luxury
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedBungalowType === 'Super Luxury'}
                                        onCheckedChange={() => setSelectedBungalowType('Super Luxury')}
                                    >
                                        Super Luxury
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Land Area</h3>
                            <Input type="number" className="sm:w-56  my-3" placeholder="Land Area" value={landArea || ""}
                                onChange={(e) => setLandArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Built-Up Area</h3>
                            <Input type="number" className="sm:w-56  my-3" placeholder="Built-Up Area" value={builtUpArea || ""}
                                onChange={(e) => setBuiltUpArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Filling Depth</h3>
                            <Input type="number" className="sm:w-56  my-3" placeholder="Filling Depth" value={fillingDepth || ""}
                                onChange={(e) => setFillingDepth(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Total Land Area</h3>
                            <Input type="number" className="sm:w-56 my-3" placeholder="Total Land Area" value={totalLandArea || ""}
                                onChange={(e) => setTotalLandArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Total Built Up Area</h3>
                            <Input type="number" className="sm:w-56 my-3" placeholder="Total Built Up Area" value={totalBuiltUpArea || ""}
                                onChange={(e) => setTotalBuiltUpArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Base Builtup Rate (raw)</h3>
                            <Input type="number" className="sm:w-56 my-3" placeholder="Base Builtup Rate" value={baseBuiltupRate || ""}
                                onChange={(e) => setBaseBuiltupRate(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Land rate at purchase</h3>
                            <Input type="number" className="sm:w-56 my-3" placeholder="Land rate at purchase" value={landRateAtPurchase || ""}
                                onChange={(e) => setLandRateAtPurchase(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <div className="w-full lg:w-56 md:w-56 sm:w-56">
                                <h3>Corner Plot</h3>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="w-full my-2 justify-start" asChild>
                                        <Button variant="outline">{selectedCornerPlot || 'Select Whether Corner Plot'}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 my-3">
                                        <DropdownMenuLabel>Corner Plot</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem
                                            checked={selectedCornerPlot === 'Yes'}
                                            onCheckedChange={() => setSelectedCornerPlot('Yes')}
                                        >
                                            Yes
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={selectedCornerPlot === 'No'}
                                            onCheckedChange={() => setSelectedCornerPlot('No')}
                                        >
                                            No
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-self-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" sm:w-56  w-full">
                            <h3>Select Facing Type</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-full my-2 justify-start" asChild>
                                    <Button variant="outline">{selectedFacingType || 'Select Facing Type'}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 my-3">
                                    <DropdownMenuLabel>Select Facing Type</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                        checked={selectedFacingType === 'East'}
                                        onCheckedChange={() => setSelectedFacingType('East')}
                                    >
                                        East
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedFacingType === 'West'}
                                        onCheckedChange={() => setSelectedFacingType('West')}
                                    >
                                        West
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedFacingType === 'North'}
                                        onCheckedChange={() => setSelectedFacingType('North')}
                                    >
                                        North
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={selectedFacingType === 'South'}
                                        onCheckedChange={() => setSelectedFacingType('South')}
                                    >
                                        South
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className=" justify-self-center w-full">
                    <div className=" flex flex-col justify-center items-center">
                        <div className="  my-3 sm:w-56  flex flex-col justify-center items-cente w-full">
                            <Button onClick={handleFormSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
                <div className=" justify-self-center w-full">
                    <div className=" flex flex-col justify-center items-center">
                        <div className="  my-3 sm:w-56  flex flex-col justify-center items-cente w-full">
                            <Button onClick={handleFormReset}>Reset</Button>
                        </div>
                    </div>
                </div>
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
        </>
    );
}
export default BungalowConfig;
