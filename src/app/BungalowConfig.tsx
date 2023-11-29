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

    const handleFormSubmit = () => {
        // Call the onSelectValues function with the selected values
        onSelectValues({
            bungalowType: selectedBungalowType,
            cornerPlot: selectedCornerPlot,
            facingType: selectedFacingType,
            fillingDepth: fillingDepth,
            builtUpArea: builtUpArea,
            landArea: landArea,
            // Add other selected values as needed
        });
    };

    return (
        <div className="grid grid-cols-4 justify-center items-center py-6">
            <div>
                <h3>Bungalow Type</h3>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-56 my-2" asChild>
                <Button variant="outline">{selectedBungalowType || 'Select Bungalow Type'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
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
        <div>
            <h3>Enter Land Area</h3>
            <Input type="number" className="w-56 my-3" placeholder="Land Area" value={landArea || ""}
                onChange={(e) => setLandArea(Number(e.target.value))} />
                </div>
                <div>
            <h3>Enter Built-Up Area</h3>
            <Input type="number" className="w-56 my-3" placeholder="Built-Up Area" value={builtUpArea || ""}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))} />
                </div>
                <div>
            <h3>Enter Filling Depth</h3>
            <Input type="number" className="w-56 my-3" placeholder="Filling Depth" value={fillingDepth || ""}
                onChange={(e) => setFillingDepth(Number(e.target.value))} />
                </div>
                <div className="py-6">
            <h3>Select Whether Corner</h3>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-56 my-3" asChild>
                <Button variant="outline">{selectedCornerPlot || 'Select Whether Corner Plot'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 my-3">
                    <DropdownMenuLabel>Select Whether Corner Plot</DropdownMenuLabel>
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
                        <div className="py-6">
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
            <div className="">
                <Button onClick={handleFormSubmit}>Submit</Button>
            </div>
            {/* <Input type="number" placeholder="Remoteness Factor" /> */}

        </div>
    );
}
export default BungalowConfig;
