// import { userInfo } from "os";
import { z } from "zod";
export const userInfoSchema =z.object({
    landArea: z.number().min(1,{message:"enter ,ore than 1"}).max(10,{message:"enter less tha n 10"})
})