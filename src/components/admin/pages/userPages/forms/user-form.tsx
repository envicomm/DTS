import {
  RegisterSchema,
  TRegister,
  TUserForm,
  UserFormSchema,
} from "@/schema/data-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";
import { Divisions } from "@/constant/data";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../../ui/calendar";
import { Separator } from "../../../../ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "../../../../ui/avatar";
import { z } from "zod";
import {
  useRegisterUserMutation,
  useUpdateUserMutation,
} from "./mutations/form-mutations";
import { toast } from "react-toastify";

type FormProps = {
  user?: TUserForm;
};
export const UserForm = ({ user }: FormProps) => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState("");
  const updateUserMutaion = useUpdateUserMutation();
  const registerMutation = useRegisterUserMutation();

  const form = useForm<TRegister>({
    resolver: user ? zodResolver(UserFormSchema) : zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: user
      ? {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          assignedDivision: user.assignedDivision,
          assignedSection: user.assignedSection,
          assignedPosition: user.assignedPosition,
          dateStarted: user.dateStarted,
          jobStatus: user.jobStatus,
          accountType: user.accountType,
          contactNumber: user.contactNumber,
          password :""
        }
      : undefined,
  });

  const appendToFormData = (data: TRegister) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "imageFile") {
        formData.append(key, value as File);
      } else if (key === "dateStarted") {
        const date = new Date(value);
        const zodDate = z.date().parse(date);
        formData.append(key, zodDate.toISOString());
      } else {
        formData.append(key, value as string);
      }
    });
    return formData;
  };
  const onSubmit: SubmitHandler<TRegister> = (data) => {
    setSubmitting(true);

    const formData = appendToFormData(data);
    if (user && user.id) {
      updateUserMutaion.mutate(
        { formData, id:user.id},
        {
          onSuccess: () => {
            toast.success("User updated successfully");
            setSubmitting(false);
          },
          onError: (error) => {
            toast.error(error?.message);
            setSubmitting(false);
          },
        }
      );
    } else {
      registerMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("User created successfully");
          setSubmitting(false);
        },
        onError: (error) => {
          toast.error(error?.message);
          setSubmitting(false);
        },
      });
    }
  };

  return (
    <div className="w-full flex  items-center justify-center p-4">
      <div className="w-full  bg-white p-12 flex">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full "
          >
            <Avatar className="w-[250px] h-[250px]">
              <AvatarImage src={user ? user.signedUrl : preview} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid grid-rows-2 gap-4 ">
              <div className="grid grid-cols-3 gap-4    ">
                <FormField
                  control={form.control}
                  name="imageFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(value) => {
                            if (value.target.files) {
                              setPreview(
                                URL.createObjectURL(value.target.files[0])
                              );
                              field.onChange(value.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input placeholder="Firstname" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder="Lastname" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact number" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedDivision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={
                            user ? user.assignedDivision : undefined
                          }
                          onValueChange={(value) => {
                            setSelectedDivision(value);
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                          <SelectContent>
                            {Divisions.map((division) => (
                              <SelectItem
                                key={division.name}
                                value={division.name!}
                              >
                                {division.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedSection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          disabled={!selectedDivision}
                          defaultValue={user ? user.assignedSection : undefined}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Section" />
                          </SelectTrigger>
                          <SelectContent>
                            {Divisions.find(
                              (division) => division.name === selectedDivision
                            )?.section.map((section) => (
                              <SelectItem
                                key={section.name}
                                value={section.name!}
                              >
                                {section.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={
                            user ? user.assignedPosition : undefined
                          }
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                            <SelectItem value="TL">TL</SelectItem>
                            <SelectItem value="CH">CH</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={user ? user.accountType : undefined}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                            <SelectItem value="SUPERADMIN">
                              SUPERADMIN
                            </SelectItem>
                            <SelectItem value="USERS">USERS</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateStarted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Started</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-center text-center font-normal"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date: Date | undefined) => {
                                if (date) {
                                  field.onChange(date);
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormDescription>
                        Your date of birth is used to calculate your age.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Job Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                            <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <Separator />
                <div className="grid grid-cols-2 gap-4   ">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                onClick={() => console.log(form.formState.errors)}
                disabled={submitting}
              >
                {submitting ? "Submitting" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
