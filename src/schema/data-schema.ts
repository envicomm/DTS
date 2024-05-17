import { string, z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  userId: z.string().min(1, {
    message: "User ID is required",
  }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  assignedDivision: z.string().min(1, {
    message: "Division is required",
  }),
  assignedSection: z.string().min(1, {
    message: "Section is required",
  }),
  assignedPosition: z.string().min(1, {
    message: "Position is required",
  }),
  dateStarted: z.date().refine((date) => Boolean(date), {
    message: "Date Started is required",
  }),
  jobStatus: z.enum(["ACTIVE", "INACTIVE", "PENDING"], {
    message: "Invalid Input",
  }),
  password: z.optional(
    z.string().min(1, {
      message: "Password is required",
    })
  ),
  accountRole: z.enum(["ADMIN", "SUPERADMIN", "USER"], {
    message: "Invalid Input",
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
  contactNumber: z.string().min(1, {
    message: "Contact number is required",
  }),
});
export const UserFormSchema = RegisterSchema.omit({
  password: true,
}).extend({
  id: z.optional(z.string()),
  signedUrl: z.optional(z.string()),
});

export const UsersInfo = RegisterSchema.omit({
  password: true,
  imageFile: true,
}).extend({
  id: z.string(),
  signedUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  accountId: z.string(),
  imageUrl: z.string(),
});
export const AccountSchema = z.object({
  email: z.string(),
  accountRole: z.enum(["ADMIN", "SUPERADMIN", "USER"], {
    message: "Invalid Input",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  id: z.string(),
});
export const loginUserSchema = AccountSchema.omit({
  id: true,
  accountRole: true,
});

//Account Types
export type TAccount = z.infer<typeof AccountSchema>;
export type TUserForm = z.infer<typeof UserFormSchema>;
export type TLogin = z.infer<typeof loginUserSchema>;
export type TUsers = z.infer<typeof UsersInfo>;
export type TRegister = z.infer<typeof RegisterSchema>;

//Trnsaction Schema
export const transactionDetailsSchema = z.object({
  documentType: z.string({
    message:"Document TYPE REQUIRED"
  }),
  subject: z.string(),
  company: z.string(),
  forwardedTo: z.string(),
  forwardedFrom: z.string(),
  remarks: z.string(),
  fromDepartment: z.string(),
  toDepartment: z.string(),
  accountId: z.string(),
  dueDate: z.date(),
  forwardedBy: z.string(),
  department: z.string(),
  dateForwarded: z.date(),
  transactionId: z.string(),
  documentSection: z.string(),
});

//Transaction Types
export type TtransactionDetails = z.infer<typeof transactionDetailsSchema>;
