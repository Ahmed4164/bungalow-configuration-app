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
const DEFAULT_VALUES = {
    selectedBungalowType: "",
    selectedFacingType: "",
    selectedCornerPlot: "",
    fillingDepth: 0,
    builtUpArea: 0,
    landArea: 0,
    totalLandArea: 0,
    totalBuiltUpArea: 0,
    numberOfFloors: 0,
    baseBuiltupRate: 0,
    landRateAtPurchase: 0,
};

const BungalowConfig: React.FC = () => {
    const [selectedBungalowType, setSelectedBungalowType] = React.useState<string>(DEFAULT_VALUES.selectedBungalowType);
    const [selectedFacingType, setSelectedFacingType] = React.useState<string>(DEFAULT_VALUES.selectedFacingType);
    const [selectedCornerPlot, setSelectedCornerPlot] = React.useState<string>(DEFAULT_VALUES.selectedCornerPlot);
    const [fillingDepth, setFillingDepth] = React.useState<number>(DEFAULT_VALUES.fillingDepth);
    const [builtUpArea, setBuiltUpArea] = React.useState<number>(DEFAULT_VALUES.builtUpArea);
    const [landArea, setLandArea] = React.useState<number>(DEFAULT_VALUES.landArea);
    const [totalLandArea, setTotalLandArea] = React.useState<number>(DEFAULT_VALUES.totalLandArea);
    const [totalBuiltUpArea, setTotalBuiltUpArea] = React.useState<number>(DEFAULT_VALUES.totalBuiltUpArea);
    const [numberOfFloors, setNumberOfFloors] = React.useState<number>(DEFAULT_VALUES.numberOfFloors);
    const [baseBuiltupRate, setBaseBuiltupRate] = React.useState<number>(DEFAULT_VALUES.baseBuiltupRate);
    const [landRateAtPurchase, setLandRateAtPurchase] = React.useState<number>(DEFAULT_VALUES.landRateAtPurchase);

    const [currentLandRate, setCurrentLandRate] = React.useState<number | null>(null);
    const [NetSellingLandPrice, setNetSellingLandPrice] = React.useState<number | null>(null);
    const [landPrice, setLandPrice] = React.useState<number | null>(null);
    const [baserateWithFlooraAddition, setBaserateWithFlooraAddition] = React.useState<number | null>(null);
    const [buildingPrice, setBuildingPrice] = React.useState<number | null>(null);
    const [subTotal, setSubTotal] = React.useState<number | null>(null);
    const [cornerCharge, setCornerCharge] = React.useState<number | null>(null);
    const [facingCharge, setFacingCharge] = React.useState<number | null>(null);
    const [grandTotal, setGrandTotal] = React.useState<number | null>(null);
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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

        let remotenessCharge = 100;
        let facingCharge = (subTotal ?? 0) * facing;
        let cornerCharge = (subTotal ?? 0) * cornerFactor;
        let grandTotal = (subTotal ?? 0) + cornerCharge + facingCharge + fillingCharge + (facingCharge ? remotenessCharge : 0);
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

        setSelectedBungalowType(DEFAULT_VALUES.selectedBungalowType);
        setSelectedFacingType(DEFAULT_VALUES.selectedFacingType);
        setSelectedCornerPlot(DEFAULT_VALUES.selectedCornerPlot);
        setFillingDepth(DEFAULT_VALUES.fillingDepth);
        setBuiltUpArea(DEFAULT_VALUES.builtUpArea);
        setLandArea(DEFAULT_VALUES.landArea);
        setTotalLandArea(DEFAULT_VALUES.totalLandArea);
        setTotalBuiltUpArea(DEFAULT_VALUES.totalBuiltUpArea);
        setNumberOfFloors(DEFAULT_VALUES.numberOfFloors);
        setBaseBuiltupRate(DEFAULT_VALUES.baseBuiltupRate);
        setLandRateAtPurchase(DEFAULT_VALUES.landRateAtPurchase);

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
    const data = [
        { label: "Current Land Price:", value: currentLandRate },
        { label: "Net Selling Land Price:", value: NetSellingLandPrice },
        { label: "Land Price:", value: landPrice },
        { label: "Base rate with floor addition:", value: baserateWithFlooraAddition },
        { label: "Base price:", value: buildingPrice },
        { label: "Sub Total:", value: subTotal },
        { label: "Corner Charge:", value: cornerCharge },
        { label: "Facing Charge:", value: facingCharge },
        { label: "Grand Total:", value: grandTotal },
    ];
    return (
        <form className="px-4 mx-auto" onSubmit={handleFormSubmit}>
            <div className="grid gap-x-10 mt-8 lg:gap-y-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col">
                    <label className=" py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="bungalowType">Bungalow Type</label>
                    {/* <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="bungalowType">Bungalow Type</label> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="justify-start" id="bungalowType" asChild>
                            <Button className="my-2" variant="outline">{selectedBungalowType || 'Select Bungalow Type'}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" ">
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
                <div className="">
                    <div className="">
                        <div className="">
                            <label className="block py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="landArea">Land Area (Sq. Ft.)</label>
                            <Input type="number" className="mt-1 mb-2" id="landArea" placeholder="Land Area" value={landArea || ""}
                                onChange={(e) => setLandArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <label className="block py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="builtUpArea">Built-Up Area (Sq. Ft.)</label>
                            <Input type="number" id="builtUpArea" className="mt-1 mb-2" placeholder="Built-Up Area" value={builtUpArea || ""}
                                onChange={(e) => setBuiltUpArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className=" ">
                            <label className="block py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="fillingDepth">Filling Depth (Sq. Ft.)</label>
                            <Input type="number" id="fillingDepth" className="mt-1 mb-2" placeholder="Filling Depth" value={fillingDepth || ""}
                                onChange={(e) => setFillingDepth(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <label className="block py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="totalLandArea">Total Land Area (Sq. Ft.)</label>
                            <Input type="number" id="totalLandArea" className="mt-1 mb-2" placeholder="Total Land Area" value={totalLandArea || ""}
                                onChange={(e) => setTotalLandArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <label className="block py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="totalBuiltUpArea">Total Built Up Area (Sq. Ft.)</label>
                            <Input type="number" id="totalBuiltUpArea" className="mt-1 mb-2" placeholder="Total Built Up Area" value={totalBuiltUpArea || ""}
                                onChange={(e) => setTotalBuiltUpArea(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <label className="block py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="baseBuiltUpRate">Base Builtup Rate (raw) (Sq. Ft.)</label>
                            <Input type="number" id="baseBuiltUpRate" className="mt-1 mb-2" placeholder="Base Builtup Rate" value={baseBuiltupRate || ""}
                                onChange={(e) => setBaseBuiltupRate(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <label className="block py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="landRatePurchase">Land rate at purchase (Sq. Ft.)</label>
                            <Input type="number" id="landRatePurchase" className=" mt-1 mb-2" placeholder="Land rate at purchase" value={landRateAtPurchase || ""}
                                onChange={(e) => setLandRateAtPurchase(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="flex flex-col  ">
                                <label className="py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="cornerPlot">Corner Plot</label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger id="cornerPlot" className="mt-1 mb-2 justify-start" asChild>
                                        <Button variant="outline" className="my-2"  >{selectedCornerPlot || 'Select Corner Plot'}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="">
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
                <div className="">
                    <div className="">
                        <div className="flex flex-col">
                            <label className="py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="facingType">Select Facing Type</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger id="facingType" className="mt-1 mb-2 justify-start" asChild>
                                    <Button className="my-2" variant="outline">{selectedFacingType || 'Select Facing Type'}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="">
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
                <div className=" flex justify-center items-end">
                    <Button className="w-full my-2 "type="submit" >SUBMIT</Button>
                </div>
                <div className=" flex justify-center items-end">
                    <Button className="w-full my-2 " onClick={handleFormReset}>RESET</Button>
                </div>
            </div>
            <div className="">
                <div className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 my-4">
                    {data.map((item, index) => (
                        <div key={index} className="p-2">
                            <div className="grid grid-cols-2 justify-between">
                                <div>
                                    <h1>{item.label}</h1>
                                </div>
                                <div className="flex items-end justify-end">
                                    <h1>{item.value ? item.value : 0}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
}
export default BungalowConfig;
