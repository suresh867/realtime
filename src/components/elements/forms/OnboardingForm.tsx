/* eslint-disable */
"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from "@/lib/actions/createUser"
import { OnboardingValidationSchema } from "@/lib/validation/user.form.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"


interface OnboardingFormProps {
    sessionData: {
        id: string;
        email: string;
        imageUrl: string;
        fullName: string;
    },
    usernames: string[],
}
export default function OnboardingForm({
    sessionData,
    usernames,
}: OnboardingFormProps) {

    const [tabs, setTabs] = useState(0)
    const [slugExists, setSlugExists] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof OnboardingValidationSchema>>({
        resolver: zodResolver(OnboardingValidationSchema),
        defaultValues: {
            userId: sessionData.id,
            email: sessionData.email,
            fullName: sessionData.fullName,
            username: "",
        },
    })

    const onError = (errors: any) => {
        console.log("form error: ", errors)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.values(errors).forEach((error: any) => {
            console.log("form error toast: ", error.message)
            toast.error(error.message);
        });
    };

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === 'username') {
                if (usernames && value.username) {
                    setSlugExists(usernames.includes(value.username));
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch, usernames, form]);

    async function onSubmit(values: z.infer<typeof OnboardingValidationSchema>) {
        try {
            if (usernames?.includes(values.username)) {
                toast(`Slug "${values.username}" already exists. Please choose another one.`);
                return;
            }
            if (values) {
                const createUserData: UserForm = {
                    userId: sessionData.id,
                    username: values.username,
                    email: sessionData.email,
                    fullName: sessionData.fullName,
                    imageUrl: sessionData.imageUrl,
                }
                const res = await createUser({ userData: createUserData })
                toast(res.status)
            }
        } catch (error) {
            console.log("Error ocurred:", error)
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <aside className="flex flex-col gap-7 border-2 rounded-lg p-10 w-full max-w-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder={sessionData.fullName} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={sessionData.email} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a unique username..." {...field} />
                                    </FormControl>
                                    {slugExists && (
                                        <p className="text-red-500 mt-2 text-xs max-w-[16rem]">Username &quot;{field.value}&quot; already exists. Please choose another one.</p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex justify-end gap-4">
                            {
                                tabs > 0 && (
                                    <div
                                        onClick={() => setTabs(tabs - 1)}
                                        className="hover:cursor-pointer py-2 px-3 border rounded-md text-sm"
                                    >
                                        Previous
                                    </div>
                                )
                            }
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </aside>
        </div>
    )
}
