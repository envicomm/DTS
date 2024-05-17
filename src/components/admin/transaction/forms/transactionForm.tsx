import FormInput from "@/components/common/formInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Divisions } from "@/constant/data";
import {
  TtransactionDetails,
  transactionDetailsSchema,
} from "@/schema/data-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const TransactionForm = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const form = useForm<TtransactionDetails>({
    resolver: zodResolver(transactionDetailsSchema),
    mode: "onChange",
    defaultValues:{
      forwardedFrom:"Records"

    }
  });

  const onSubmit: SubmitHandler<TtransactionDetails> = () => {};

  return (
    <div className="w-full h-full p-4">
      <Form {...form}>
        <form onClick={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2 ">
            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Transaction ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toDepartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <FormControl>
                    <Select
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
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="documentSection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Section</FormLabel>
                    <FormControl>
                      <Select onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          {Divisions.find(
                            (division) => division.name === selectedDivision
                          )?.section.map((section) => (
                            <SelectItem key={section.name} value={section.name!}>
                              {section.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedDivision(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormInput placeholder="Subject" label="Subject" name="subject"/>
            <FormInput placeholder="company" label="company" name="company"/>
            <FormInput placeholder="forwardedFrom" label="forwardedFrom" name="forwardedFrom" disable/>
          </div>
        </form>
      </Form>
    </div>
  );
};
