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
  cornerFacing: z.string(),
  facingType: z.string(),
  landArea: z.coerce.number().min(3, {
    message: 'Land Area must be at least 3.',
  }),
  fillingDepth: z.coerce.number().min(3, {
    message: 'Land Area must be at least 3.',
  }),
  totalLandArea: z.coerce.number().min(10, {
    message: 'Land Area must be at least 3.',
  }),
  totalBuiltUpArea: z.coerce.number().min(3, {
    message: 'Land Area must be at least 3.',
  }),
  baseBuiltUpRate: z.coerce.number().min(100000, {
    message: 'Land Rate must be at least 100000.',
  }),
  landRatePurchase: z.coerce.number().min(100000, {
    message: 'Land Rate must be at least 100000.',
  }),
})

export interface FixedTypes extends Array<BaseInputTypes> { }

export interface BaseInputTypes {
  name: string;
  value: number;
}
const initialOutputValues = [

  { name: "landArea", value: 100 },
  { name: "fillingDepth", value: 100 },
  { name: "totalLandArea", value: 100 },
  { name: "totalBuiltUpArea", value: 100 },
  { name: "baseBuiltUpRate", value: 100 },
  { name: "landRatePurchase", value: 100 },
]

export default function Home() {
  const [output, setOutput] = useState<FixedTypes>(initialOutputValues);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bungalowType: 'raw',
      cornerFacing:'Yes',
      facingType:'East',
      landArea: 10,
      baseBuiltUpRate: 100000,
      landRatePurchase: 100000,
      fillingDepth: 50,
      totalLandArea: 60,
      totalBuiltUpArea: 70,
    },
    mode: "onChange",
  })

  interface UpdateOutput {
    values: z.infer<typeof FormSchema>
    output: FixedTypes,
    setOutput: React.Dispatch<React.SetStateAction<FixedTypes>>
  }

  const updateOutput = (fn: UpdateOutput) => {
    let sellFactor = 0.2;
    let developmentCharge = 200;
    let legalCharge = 200;
    let AdditionalLandArea = 1700;
    let AdditionalBuiltUpArea = 1000;
    let numberOfFloors = 2;

    let currentLandRate = fn.values.landRatePurchase
      ? fn.values.landRatePurchase * (1 + sellFactor)
      : null;

    let NetSellingLandPrice =
      currentLandRate ? currentLandRate + developmentCharge + legalCharge : null;

    let landPrice =
      NetSellingLandPrice && fn.values.totalLandArea
        ? NetSellingLandPrice * (AdditionalLandArea + fn.values.totalLandArea + legalCharge)
        : null;

    let baserateWithFlooraAddition = fn.values.baseBuiltUpRate
      ? fn.values.baseBuiltUpRate * (1 + 0.05 * Math.max(numberOfFloors! - 3, 0))
      : null;

    let buildingPrice = fn.values.baseBuiltUpRate
      ? fn.values.baseBuiltUpRate * (AdditionalBuiltUpArea + fn.values.baseBuiltUpRate!)
      : null;

    let cornerFactor = 0.01;
    let facing = 0.05;

    let subTotal = landPrice && buildingPrice ? landPrice + buildingPrice : null;

    let fillingRate = 100;
    let fillingCharge = fn.values.fillingDepth ? fn.values.fillingDepth * fillingRate : 0;

    let remotenessCharge = 100;
    let facingCharge = (subTotal ?? 0) * facing;
    let cornerCharge = (subTotal ?? 0) * cornerFactor;
    let grandTotal = (subTotal ?? 0) + cornerCharge + facingCharge + fillingCharge + (facingCharge ? remotenessCharge : 0);

    console.log(fn.values)


    fn.setOutput(prev => {
      return [
        { name: "currentLandRate", value: currentLandRate },
        { name: "NetSellingLandPrice", value: NetSellingLandPrice },
        { name: "landPrice", value: landPrice },
        { name: "baserateWithFlooraAddition", value: baserateWithFlooraAddition },
        { name: "buildingPrice", value: buildingPrice },
        { name: "subTotal", value: subTotal },
        { name: "facingCharge", value: facingCharge },
        { name: "cornerCharge", value: cornerCharge },
        { name: "grandTotal", value: grandTotal },
      ]
    })
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    updateOutput({ values, output, setOutput });
    console.log(values)
  }
  console.log("final output", output)

  const handleFormReset = () => {
    form.reset();
    const values: z.infer<typeof FormSchema> = form.getValues();
    console.log(values);
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
                    <SelectItem value="raw">Raw</SelectItem>
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
            name="landArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Area (Sq. Ft.)</FormLabel>
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
          <FormField
            control={form.control}
            name="fillingDepth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filling Depth (Sq. Ft.)</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Filling Depth (Sq. Ft.)"
                    {...field}
                  />
                </FormControl>
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

          <FormField
            control={form.control}
            name="landRatePurchase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Rate Purchase (Sq. Ft.)</FormLabel>
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input
                    type="number"
                    placeholder="Land Rate Purchase"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex justify-center items-end">
            <Button className="w-full my-2 " onClick={handleFormReset}>RESET</Button>
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
