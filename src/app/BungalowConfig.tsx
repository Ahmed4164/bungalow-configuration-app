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

interface BungalowConfigProps {
    onSelectValues: (values: {
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
        // Add other selected values as needed
    }) => void;
}

const BungalowConfig: React.FC<BungalowConfigProps> = ({ onSelectValues }) => {
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

    const handleFormSubmit = () => {
        onSelectValues({
            bungalowType: selectedBungalowType,
            cornerPlot: selectedCornerPlot,
            facingType: selectedFacingType,
            fillingDepth: fillingDepth,
            builtUpArea: builtUpArea,
            landArea: landArea,
            totalLandArea: totalLandArea,
            totalBuiltUpArea: totalBuiltUpArea,
            numberOfFloors: numberOfFloors,
            baseBuiltupRate: baseBuiltupRate,
            landRateAtPurchase: landRateAtPurchase,
            // Add other selected values as needed
        });
    };
    const handleFormReset = () => {
        setSelectedBungalowType('');
        setSelectedCornerPlot('');
        setSelectedFacingType('');
        setFillingDepth(null);
        setBuiltUpArea(null);
        setLandArea(null);
        setTotalLandArea(null);
        setTotalBuiltUpArea(null);
        setNumberOfFloors(null);
        setBaseBuiltupRate(null);
        setLandRateAtPurchase(null);
      };
    return (
        // <div className="grid grid-cols-4 justify-center items-center py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center py-6">
             <div className="justify-self-center w-full">
                <div className="flex flex-col justify-center items-center">
                    <div className=" sm:w-56  w-full">
                <h3>Bungalow Type</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full my-2 justify-self-center" asChild>
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
                        <Input type="number" className="sm:w-56  my-3" placeholder="Filling Depth" value={builtUpArea || ""}
                            onChange={(e) => setFillingDepth(Number(e.target.value))} />
                    </div>
                </div>
            </div>
            <div className="justify-self-center w-full">
                <div className="flex flex-col justify-center items-center">
                    <div className=" sm:w-56  w-full">
                    <h3>Total Land Area</h3>
                    <Input type="number" className="sm:w-56 my-3" placeholder="total Lanfd Ares" value={totalLandArea || ""}
                    onChange={(e) => setTotalLandArea(Number(e.target.value))} />
                    </div>
                </div>
            </div>
            <div className="justify-self-center w-full">
                <div className="flex flex-col justify-center items-center">
                    <div className=" sm:w-56  w-full">
                    <h3>Total Built Up Area</h3>
                    <Input type="number" className="sm:w-56 my-3" placeholder="totalBuiltUpArea" value={totalBuiltUpArea || ""}
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
                    <DropdownMenuTrigger className="w-56 my-3" asChild>
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
                    <DropdownMenuTrigger className="w-56 my-3" asChild>
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
    );
}
export default BungalowConfig;
