import { FixedTypes, formSchema } from "@/app/BungalowConfig"

import * as z from 'zod'

interface UpdateOutput {
    values: z.infer<typeof formSchema>
    output: FixedTypes,
    setOutput: React.Dispatch<React.SetStateAction<FixedTypes>>
}
// let sellFactor: number = 0.2;
// let developmentCharge = 200;
// let legalCharge = 200;
// let AdditionalLandArea = 1700;
// let AdditionalBuiltUpArea = 1000;
// let cornerFactor = 0.01;
// let facing = 0.05;
// let fillingRate = 100;
// let remotenessCharge = 100;

export const updateOutput = (fn: UpdateOutput) => {
    // changing dependent fields
    const landArea = fn.values.landArea
    {console.log(landArea)}
    fn.setOutput(prev => {
        return [
            { name: "bungalowType", value: 100 },
            { name: "cornerFacing", value: 100 },
            { name: "facingType", value: 100 },
            { name: "landArea", value: 100 },
            { name: "fillingDepth", value: 100 },
            { name: "totalLandArea", value: 100 },
            { name: "totalBuiltUpArea", value: 100 },
            { name: "baseBuiltUpRate", value: 100 },
            { name: "landRatePurchase", value: 100 },

        ]
    })

    // setValues((prev) => ({
    //   ...prev,
    //   ratePerSQFT: updatedRatePerSqft,
    //   roadFactors: updatedRoadFactors,
    //   builtUpPerDecimal: builtupPerDecimal,
    //   landAreaSQFT: landAreaPerSqft,
    //   builtUpArea: builtUpArea,
    //   landPrice1Year: landPrice1Year,
    //   landPrice2Year: landPrice2Year,
    //   landPrice3Year: landPrice3Year,
    //   landPrice4Year: landPrice4Year,
    //   constructionCost: constCost,
    //   otherCost: otherCost,
    //   totalConsPrice1year: totalConstPrice1Year,
    //   totalConsPrice2year: totalConstPrice2Year,
    //   totalConstPrice3Year: totalConstPrice3Year,
    //   totalConstPrice4Year: totalConstPrice4Year,
    //   totalAmount1Year: totalAmount1Year,
    //   totalAmount2Year: totalAmount2Year,
    //   totalAmount3Year: totalAmount3Year,
    //   totalAmount4Year: totalAmount4Year,
    //   landOwnerRatio1Year: landOwnerRatio1Year,
    //   landOwnerRatio2Year: landOwnerRatio2Year,
    //   landOwnerRatio3Year: landOwnerRatio3Year,
    //   landOwnerRatio4Year: landOwnerRatio4Year,
    // }));
}


export const filterData = (data: FixedTypes, paymentSpan: number[]) => {
    const newArray = [];
    for (let i = 0; i <= paymentSpan[0]; i++) {
        newArray.push(i)
    }
    // console.log("newArray", newArray)

    const filteredData =
        newArray.map(index => {
            return data.filter(obj => obj.name.includes(String(index)))
        }).flat()
    //    console.log("filteredData", filteredData)

    return filteredData;
}

export const convertToLakh = (value: string | number) => {
    value = String(value)
    if (typeof value === 'string') {
        if (value.length >= 6 && value.length < 8) {
            const lakh = Number(value) / 100000
            const updatedLakh = lakh.toLocaleString('en-In', { currency: 'INR', style: 'currency' }).replace('₹', 'INR ')
            return updatedLakh + ' Lakh'
        } else if (value.length >= 8) {
            const crore = Number(value) / 10000000
            const updatedCrore = crore.toLocaleString('en-In', { currency: 'INR', style: 'currency' }).replace('₹', 'INR ')
            return updatedCrore + ' Crores'
        } else {
            let val = Number(value);
            let updatedVal = val.toLocaleString('en-In', { currency: 'INR', style: 'currency' })
            console.log(updatedVal)
            return updatedVal;
        }
    }
}

export const intoCommas = (value: number) => {
    const updatedValue = value.toLocaleString('en-In', { currency: 'INR', style: 'currency' }).replace('₹', '')
    return updatedValue
}


