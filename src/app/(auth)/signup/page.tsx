"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod/v4";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import axios from "axios";

export default function Signup() {
    const schema = z.object({
        email: z.string()
            .nonempty("Email is required")
            .endsWith("@gmail.com", "Only Gmail allowed"),
        password: z.string()
            .nonempty("Password is required")
            .min(6, "Password must be at least 6 characters"),
        phoneNum: z.string()
            .nonempty("number is required")
            .min(10, "number must be at least 10 characters")
            .max(10, "number must be at least 10 characters"),
        otp: z.string()
            .nonempty("otp is required")
            .min(6, "otp must be at least 6 characters")
            .max(6, "otp must be at least 6 characters")

    })
    type schemaType = z.infer<typeof schema>
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<schemaType>({
        resolver: zodResolver(schema),
    });
    async function clickSubmit(data: schemaType) {
        const { email, password, phoneNum, otp } = data
        const isSignup = await axios.post("http://localhost:3000/api/users/signup", { email, password, phoneNum, otp });
        console.log(isSignup)
        if (isSignup.data.success) {
            const isTrue = await axios.post("http://localhost:3000/api/users/login", { email, password });
            if (isTrue.data.success) {
                localStorage.setItem("id", JSON.stringify(isTrue.data.userID))
                localStorage.setItem("toggle", JSON.stringify(isTrue.data.success))
                alert("Signup successfully")
                window.location.href = "/"
            }
        }
        reset()
    }
    return (
        <div>
            <div className="">
                <form onSubmit={handleSubmit(clickSubmit)}>
                    <Card className="w-full max-w-sm mx-auto my-[60px]">
                        <CardHeader>
                            <CardTitle>Signup to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to signup to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">
                                    <Link href={"/login"}>Login</Link>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>

                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        placeholder="xyz@gamil.com"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input  {...register("password")} id="password" type="password" />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="">
                                        <Label htmlFor="number">number</Label>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Input  {...register("phoneNum")} id="number" type="number" maxLength={10} />
                                            {errors.phoneNum && <p className="text-red-500">{errors.phoneNum.message}</p>}
                                        </div>
                                        <p className="px-5 py-[5px] border rounded-[5px]" onClick={async () => {
                                            const phoneNum = getValues("phoneNum");
                                            if (!phoneNum) return alert("Please enter phone number first");
                                            const res = await axios.post("/api/users/otp", { phoneNum });
                                            console.log(res.data);
                                        }}>Send OTP</p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="otp">otp</Label>
                                    </div>
                                    <Input  {...register("otp")} id="otp" type="otp" />
                                    {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
                                </div>

                            </div>

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div >
    )
}


