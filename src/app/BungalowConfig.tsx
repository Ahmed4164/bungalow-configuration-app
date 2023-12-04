"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const FormSchema = z.object({
  bungalowType: z.string(),
  totalLandArea: z.coerce.number().min(50, {
    message: 'Total Land Area be at least 50.',
  }),
  numberOfFloors: z.coerce.number().min(1, {
    message: 'Number of floors must be atleast 1.',
  }),
  totalBuiltUpArea: z.coerce.number().min(50, {
    message: 'Total BuiltUp Area must be at least 50.',
  }),
  remotenessFactor:  z.coerce.number().refine((value) => value >= 0 && value <= 1, {
    message: 'Remoteness Factor must be in between 0 and 1.',
  }),
  baseBuiltUpRate: z.coerce.number().min(1000, {
    message: 'Base BuiltUp Rate be at least 1000.',
  }),
  landRateAtPurchase: z.coerce.number().min(1000, {
    message: 'Land Rate At Purchase must be least 1000.',
  }),
  currentLandRate: z.coerce.number().min(1000, {
    message: 'Current Land Rate must be at least 1000.',
  }),
  landValueSellFactor: z.coerce.number().refine((value) => value >= 0 && value <= 1, {
    message: 'Land Value Sell Factor must be in between 0 and 1.',
  }),
  devCharge: z.coerce.number().min(1, {
    message: 'Development Charge must be at least 1.',
  }),
  legalCharge: z.coerce.number().min(1, {
    message: 'Legal Charge Rate must be at least 1.',
  }),
  adjustmentFactor: z.coerce.number().refine((value) => value >= 0 && value <= 1, {
    message: 'Adjustment Factor must be in between 0 and 1.',
  }),
  fillingRate: z.coerce.number().min(1, {
    message: 'Filling Rate must be at least 1.',
  }),
  cornerFactor: z.coerce.number().refine((value) => value >= 0 && value <= 1, {
    message: 'Corner Factor must be in between 0 and 1.',
  }),
  projectManagement: z.coerce.number().min(1, {
    message: 'Project Management cost must at least 1.',
  }),
  unitAdjustmentFactor: z.coerce.number().refine((value) => value >= 0 && value <= 1, {
    message: 'Unit Adjustment Factor must be in between 0 and 1.',
  }),
  unitFillingDepth: z.coerce.number().min(1, {
    message: 'Unit Filling Depth cost at least 1.',
  }),
  cornerFacing: z.string(),
  facingType: z.string(),
  AdditionalSemiFinishedBuiltupArea: z.coerce.number().min(50, {
    message: 'Additional Semi Finished Builtup Area must be at least 50.',
  }),
})

export interface FixedTypes extends Array<BaseInputTypes> { }

export interface BaseInputTypes {
  name: string;
  value: string;
}
const initialOutputValues = [
  { name: "Land Price", value: "INR 1,00,200"},
  { name: "Building Price", value: "INR 1,20,000"},
  { name: "Sub Total", value: "INR 2,20,200"},
  { name: "Corner Charge", value: "INR 2,202"},
  { name: "Facing Charge", value: "INR 0"},
  { name: "Filling Charge", value: "INR 50"},
  { name: "Remoteness Charge", value: "INR 240"},
  { name: "Project Management Cost", value: "INR 2,20,200"},
  { name: "Project Adjustment Charge", value: "INR 1,101"},
  { name: "Unit Charge", value: "INR 1,101"},
  { name: "Grand Total", value: "INR 4,53,902"},
]

export default function Home() {
  const [output, setOutput] = useState<FixedTypes>(initialOutputValues);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bungalowType: 'Raw',
      totalLandArea: 50,
      numberOfFloors:1,
      totalBuiltUpArea: 50,
      remotenessFactor:0.2,
      baseBuiltUpRate: 1000,
      landRateAtPurchase:1000,
      currentLandRate:1000,
      landValueSellFactor:0.5,
      devCharge:1,
      legalCharge:1,
      adjustmentFactor:0.5,
      fillingRate:1,
      cornerFactor:0.5,
      projectManagement:1,
      unitAdjustmentFactor:0.5,
      unitFillingDepth:1,
      cornerFacing: 'Yes',
      facingType: 'Nofacing',
      AdditionalSemiFinishedBuiltupArea: 50,

    },
    mode: "onChange",
  })

  interface UpdateOutput {
    values: z.infer<typeof FormSchema>
    output: FixedTypes,
    setOutput: React.Dispatch<React.SetStateAction<FixedTypes>>
  }

  const updateOutput = (fn: UpdateOutput) => {
    const facingPercentages: {
      Nofacing:number,
      East: number;
      West: number;
      North: number;
      South: number;
    } = {
      Nofacing:0,
      East: 5,
      West: 4,
      North: 3,
      South: 2,
    };
    const facingType = fn.values.facingType as keyof typeof facingPercentages;
    const defaultFacingPercentage = 0;
    const facingPercentage = facingPercentages[facingType] || defaultFacingPercentage;

    let Netsellinglandrate = ((fn.values.landValueSellFactor)*(fn.values.landRateAtPurchase+fn.values.currentLandRate)) + fn.values.devCharge+ fn.values.legalCharge;
    
    const bungalowPreferences: {
      Raw: number;
      Economy: number;
      Delux: number;
      SuperDelux: number;
      Luxury: number;
      SuperLuxury: number;
    } = {
      Raw: 1000,
      Economy: 1200,
      Delux: 1200,
      SuperDelux: 1400,
      Luxury: 1600,
      SuperLuxury: 1800,
    };
    
    const bungalowType = fn.values.bungalowType as keyof typeof bungalowPreferences;
    const defaultbungalowPreference = 1000;
    const bungalowPreference = bungalowPreferences[bungalowType] || defaultbungalowPreference;
    
    let rawMarkup = fn.values.numberOfFloors <= 3? fn.values.baseBuiltUpRate:  fn.values.baseBuiltUpRate * (1 + (5 / 100) * (fn.values.numberOfFloors - 3))

    if(bungalowPreference==1200){
      rawMarkup = rawMarkup +200
    }
    else if(bungalowPreference==1400){
      rawMarkup = rawMarkup +200
    }
    else if(bungalowPreference==1600){
      rawMarkup = rawMarkup +200
    }
    else{
      rawMarkup = rawMarkup +200
    }

    let landPrice =Netsellinglandrate*(fn.values.totalLandArea+fn.values.totalBuiltUpArea);
    landPrice = parseFloat(landPrice.toFixed(2));
    const formattedlandPrice = `INR ${landPrice.toLocaleString('en-IN')}`;
    
    let buildingPrice =((fn.values.totalBuiltUpArea)*(rawMarkup))+(fn.values.AdditionalSemiFinishedBuiltupArea*(rawMarkup))
    buildingPrice = parseFloat(buildingPrice.toFixed(2));
    const formattedbuildingPrice = `INR ${buildingPrice.toLocaleString('en-IN')}`;

    let subTotal=landPrice + buildingPrice;
    subTotal = parseFloat(subTotal.toFixed(2));
    const formattedsubTotal = `INR ${subTotal.toLocaleString('en-IN')}`;
    
    let cornerCharge =(subTotal*fn.values.projectManagement)/100
    cornerCharge = parseFloat(cornerCharge.toFixed(2));
    const formattedcornerCharge = `INR ${cornerCharge.toLocaleString('en-IN')}`;


    let facingCharge =(subTotal*(facingPercentage / 100))
    facingCharge = parseFloat(facingCharge.toFixed(2));
    const formattedfacingCharge = `INR ${facingCharge.toLocaleString('en-IN')}`;

    let fillingCharge = fn.values.unitFillingDepth*fn.values.fillingRate*fn.values.totalLandArea
    fillingCharge = parseFloat(fillingCharge.toFixed(2));
    const formattedfillingCharge = `INR ${fillingCharge.toLocaleString('en-IN')}`;


    let remotenessCharge =buildingPrice*(fn.values.remotenessFactor/100)
    remotenessCharge = parseFloat(remotenessCharge.toFixed(2));
    const formattedremotenessCharge = `INR ${remotenessCharge.toLocaleString('en-IN')}`;

    let projectManagement = fn.values.projectManagement*subTotal
    projectManagement = parseFloat(projectManagement.toFixed(2));
    const formattedprojectManagement = `INR ${projectManagement.toLocaleString('en-IN')}`;


    let projectAdjustmentCharge = ( subTotal*fn.values.adjustmentFactor)/100 
    projectAdjustmentCharge = parseFloat(projectAdjustmentCharge.toFixed(2));
    const formattedprojectAdjustmentCharge = `INR ${projectAdjustmentCharge.toLocaleString('en-IN')}`;

    let unitCharge =(subTotal*fn.values.adjustmentFactor)/100;
    unitCharge = parseFloat(unitCharge.toFixed(2));
    const formattedunitCharge = `INR ${unitCharge.toLocaleString('en-IN')}`;

    let grandTotal = landPrice+buildingPrice+facingCharge+fillingCharge+remotenessCharge+projectManagement+projectAdjustmentCharge +unitCharge
    grandTotal = parseFloat(grandTotal.toFixed(2));
    const formattedGrandTotal = `INR ${grandTotal.toLocaleString('en-IN')}`;


    fn.setOutput(prev => {
      return [
        { name: "Land Price", value: formattedlandPrice ?? 0 },
        { name: "Building Price", value: formattedbuildingPrice ?? 0 },
        { name: "Sub Total", value: formattedsubTotal ?? 0 },
        { name: "Corner Charge", value: formattedcornerCharge ?? 0 },
        { name: "Facing Charge", value: formattedfacingCharge ?? 0 },
        { name: "Filling Charge", value: formattedfillingCharge ?? 0 },
        { name: "Remoteness Charge", value: formattedremotenessCharge ?? 0 },
        { name: "Project Management Cost", value: formattedprojectManagement ?? 0 },
        { name: "Project Adjustment Charge", value: formattedprojectAdjustmentCharge ?? 0 },
        { name: "UnitC harge", value: formattedunitCharge ?? 0 },
        { name: "Grand Total", value: formattedGrandTotal ?? 0 },
      ]
    })
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    updateOutput({ values, output, setOutput });
  }

  const handleFormReset = () => {
    form.reset();
    const values: z.infer<typeof FormSchema> = form.getValues();
    updateOutput({ values, output, setOutput });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 mx-auto">
        <div className="grid gap-x-10 mt-8 lg:gap-y-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="bungalowType"
            render={({ field }) => (
              <FormItem onChange={form.handleSubmit(onSubmit)}>
                <FormLabel>Bungalow Type</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bungalow Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Raw">Raw</SelectItem>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Delux">Delux</SelectItem>
                    <SelectItem value="SuperDelux">SuperDelux</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="SuperLuxury">SuperLuxury</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalLandArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Land Area (Sq. Ft.)</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Total Land Area (Sq. Ft.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfFloors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Floors</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Number of floors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalBuiltUpArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total BuiltUp Area (Sq. Ft.)</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Total BuiltUp Area (Sq. Ft.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* branch */}


          <FormField
            control={form.control}
            name="remotenessFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remoteness Factor</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Remoteness Factor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baseBuiltUpRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base BuiltUp Rate</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Base BuiltUp Rate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ---------------------Project--------------------*/}
          <FormField
            control={form.control}
            name="landRateAtPurchase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Rate at Purchase</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Land Rate At Purchase"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentLandRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current land rate as per market</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Current land rate as per market"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="landValueSellFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land value sell factor</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Land value sell factor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="devCharge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Development Charge</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Development charge"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="legalCharge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal Charge</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Legal Charge"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adjustmentFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adjustment Factor</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Adjustment Factor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fillingRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filling Rate</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Filling rate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cornerFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Corner Factor</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Corner factor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectManagement"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Project Management Cost</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder=" Project management cost"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ---------------------Project--------------------*/}
          {/* <div className="bg-red-500">hii</div> */}
          <FormField
            control={form.control}
            name="unitAdjustmentFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Adjustment Factor</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Unit Adjustment Factor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unitFillingDepth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Filling Depth</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Unit Filling Depth"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cornerFacing"
            render={({ field }) => (
              <FormItem onChange={form.handleSubmit(onSubmit)}>
                <FormLabel>Corner Facing</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Corner Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facingType"
            render={({ field }) => (
              <FormItem onChange={form.handleSubmit(onSubmit)}>
                <FormLabel>Facing Type</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  {/* <Select> */}
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Facing Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Nofacing">No Facing</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="AdditionalSemiFinishedBuiltupArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Semi Finished Builtup Area</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Land Area (Sq. Ft.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex sm:mx-10 justify-center items-end sm:col-span-2 md:col-span-2 lg:col-span-3 ">
            <Button className="w-full my-3 lg:my-0" onClick={handleFormReset}>RESET</Button>
          </div>
        </div>
        <div className="">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 md:gap-x-8 my-4">
            {output.map((item, index) => (
              <div key={index} className="p-2">
                <div className="grid grid-cols-2 justify-between">
                  <div>
                    <h1>{item.name}</h1>
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
    </Form>
  )
}
