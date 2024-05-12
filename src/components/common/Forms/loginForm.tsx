import { loginUser } from "@/api/auth/auth"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TLogin, loginUserSchema } from "@/schema/data-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"


export const LoginForm = () => {

    const form = useForm<TLogin>({
        resolver: zodResolver(loginUserSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const mutate = useMutation(
        {
            mutationFn: loginUser,
            onMutate: () => console.log("onMutate"),
            onSuccess: async(data) =>{
                console.log(data)
            
            },
            onError: async() => console.log("onError"),
        }
    )
    const onSubmit: SubmitHandler<TLogin> = (data) => {
        mutate.mutate(data);
    }
    return (
        <div className="flex flex-col w-full ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <Button type="submit">Login</Button>
                </form>

            </Form>
        </div>

    )
}