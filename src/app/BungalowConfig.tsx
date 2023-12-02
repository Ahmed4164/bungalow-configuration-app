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
    message: 'Total totalBuiltUpArea must be at least 50.',
  }),
  remotenessFactor: z.coerce.number().max(1, {
    message: 'remotenessFactor max value is 1',
  }),
  baseBuiltUpRate: z.coerce.number().min(100000, {
    message: 'Base BuiltUp Rate be at least 100000.',
  }),
  landRateAtPurchase: z.coerce.number().min(10000, {
    message: 'landRateAtPurchase Rate be at least 10000.',
  }),
  currentLandRate: z.coerce.number().min(10000, {
    message: 'currentLandRate Rate be at least 10000.',
  }),
  landValueSellFactor: z.coerce.number().min(0, {
    message: 'landValueSellFactor Rate be at least 1.',
  }),
  devCharge: z.coerce.number().min(1, {
    message: 'devCharge Rate be at least 1.',
  }),
  legalCharge: z.coerce.number().min(1, {
    message: 'legalCharge Rate be at least 1.',
  }),
  adjustmentFactor: z.coerce.number().min(1, {
    message: 'adjustmentFactor Rate be at least 1.',
  }),
  fillingRate: z.coerce.number().min(1, {
    message: 'filling Rate be at least 1.',
  }),
  cornerFactor: z.coerce.number().min(1, {
    message: 'cornerFactorbe at least 1.',
  }),
  projectManagement: z.coerce.number().min(1, {
    message: 'projectManagement cost at least 1.',
  }),
  unitAdjustmentFactor: z.coerce.number().min(1, {
    message: 'unitAdjustmentFactor cost at least 1.',
  }),
  unitFillingDepth: z.coerce.number().min(1, {
    message: 'unitFillingDepth cost at least 1.',
  }),
  cornerFacing: z.string(),
  facingType: z.string(),
  AdditionalSemiFinishedBuiltupArea: z.coerce.number().min(3, {
    message: 'AdditionalSemiFinishedBuiltupArea must be at least 3.',
  }),
  
})

export interface FixedTypes extends Array<BaseInputTypes> { }

export interface BaseInputTypes {
  name: string;
  value: string;
}
const initialOutputValues = [
  { name: "landPrice", value: "INR 26,00,260"},
  { name: "buildingPrice", value: "INR 98,69,600"},
  { name: "subTotal", value: "INR 1,24,69,860"},
  { name: "cornerCharge", value: "INR 1,24,698.6"},
  { name: "facingCharge", value: "INR 6,23,493"},
  { name: "fillingCharge", value: "INR 60"},
  { name: "remotenessCharge", value: "INR 19,739.2"},
  { name: "projectManagement", value: "INR 1,24,69,860"},
  { name: "projectAdjustmentCharge", value: "INR 1,24,698.6"},
  { name: "unitCharge", value: "INR 1,24,698.6"},
  { name: "grandTotal", value: "INR 2,58,32,409.4"},
]

export default function Home() {
  const [output, setOutput] = useState<FixedTypes>(initialOutputValues);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bungalowType: 'Raw',
      totalLandArea: 60,
      numberOfFloors:10,
      totalBuiltUpArea: 70,
      remotenessFactor:0.2,
      baseBuiltUpRate: 100000,
      landRateAtPurchase:10000,
      currentLandRate:10000,
      landValueSellFactor:1,
      devCharge:1,
      legalCharge:1,
      adjustmentFactor:1,
      fillingRate:1,
      cornerFactor:1,
      projectManagement:1,
      unitAdjustmentFactor:1,
      unitFillingDepth:1,
      cornerFacing: 'Yes',
      facingType: 'East',
      AdditionalSemiFinishedBuiltupArea: 3,

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
      East: number;
      West: number;
      North: number;
      South: number;
    } = {
      East: 5,
      West: 4,
      North: 3,
      South: 2,
    };
    const facingType = fn.values.facingType as keyof typeof facingPercentages;
    const defaultFacingPercentage = 2;
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
    console.log('@@',bungalowPreference)
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
        { name: "landPrice", value: formattedlandPrice ?? 0 },
        { name: "buildingPrice", value: formattedbuildingPrice ?? 0 },
        { name: "subTotal", value: formattedsubTotal ?? 0 },
        { name: "cornerCharge", value: formattedcornerCharge ?? 0 },
        { name: "facingCharge", value: formattedfacingCharge ?? 0 },
        { name: "fillingCharge", value: formattedfillingCharge ?? 0 },
        { name: "remotenessCharge", value: formattedremotenessCharge ?? 0 },
        { name: "projectManagement", value: formattedprojectManagement ?? 0 },
        { name: "projectAdjustmentCharge", value: formattedprojectAdjustmentCharge ?? 0 },
        { name: "unitCharge", value: formattedunitCharge ?? 0 },
        { name: "grandTotal", value: formattedGrandTotal ?? 0 },
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
                <FormLabel>Number of floors</FormLabel>
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
                    placeholder="Total BuiltUp Area (Sq. Ft.)"
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
                <FormLabel>Land Rate at Purchase Area (Sq. Ft.)</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Land Rate At Purchase(Sq. Ft.)"
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
                    placeholder=" Current land rate as per market(Sq. Ft.)"
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
                <FormLabel>Dev charge</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Dev charge"
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
                <FormLabel>Legal charge</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Legal charge"
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
                <FormLabel>Adjustment FACTOR</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Adjustment FACTOR"
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
                <FormLabel> Corner factor</FormLabel>
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
                <FormLabel> Project management</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder=" Project management"
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
          <div className="flex justify-center items-end">
            <Button className="w-full my-3 sm:my-0" onClick={handleFormReset}>RESET</Button>
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
