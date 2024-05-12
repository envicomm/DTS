import { string, z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const RegisterSchema = z.object({
    email: z
    .string()
    .email({
      message: "Email is required",
    }),
    firstName: z.string().min(1,{
        message:"First name is required"
    }),
    lastName: z.string().min(1,{
        message:"Last name is required"
    }),
    assignedDivision: z.string().min(1,{
        message:"Division is required"
    }),
    assignedSection:z.string().min(1,{
        message:"Section is required"
    }),
    assignedPosition: z.string().min(1,{
        message:"Position is required"
    }),
    dateStarted: z.date().refine(date => Boolean(date), {
        message: "Date Started is required",
      }),
    jobStatus: z.enum(["ACTIVE","INACTIVE","PENDING"],{
        message:"Invalid Input"
    }),
    password: z.string().min(1,{
        message:"Password is required"
    }),
    accountType: z.enum(["ADMIN","TL","USER"],{
        message:"Invalid Input"
    }),
    imageFile: z
    .any()
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
        message: "The profile picture must be a maximum of 10MB.",
      })
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
    contactNumber: z.string().min(1,{
        message:"Contact number is required"
    })
   
})

export const loginUserSchema = z.object({
    email:z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    })
})
export const UsersInfo = RegisterSchema.omit({
    password:true,
    imageFile: true,
}).extend({
    id:z.string(),
    signedUrl : z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    accountId:z.string(),
    imageUrl:z.string()

})
export type TLogin = z.infer<typeof loginUserSchema>
export type TUsers = z.infer<typeof UsersInfo>
export type TRegister = z.infer<typeof RegisterSchema>