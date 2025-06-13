"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

export default function Login() {
    const schema = z.object({
        email: z.string()
            .nonempty("Email is required")
            .endsWith("@gmail.com", "Only Gmail allowed"),
        password: z.string()
            .nonempty("Password is required")
            .min(6, "Password must be at least 6 characters"),
    })

    type schemaType = z.infer<typeof schema>
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<schemaType>({
        resolver: zodResolver(schema),
    });
    async function clickLogin(data: schemaType) {
        axios.post("http://localhost:3000/api/users/login", data).then((res) => {
            if (res.data.success) {
                localStorage.setItem("id", JSON.stringify(res.data.userID))
                localStorage.setItem("toggle", JSON.stringify(res.data.success))

            }
            alert(res.data.message)
            window.location.href = "/"
        })
            .catch((err) => console.log(err))
        reset()
    }
    return (
        <div>
            <div className="">
                <form onSubmit={handleSubmit(clickLogin)}>
                    <Card className="w-full max-w-sm mx-auto my-[60px]">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">
                                    <Link href={"/signup"}>Sign Up</Link>
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
                                        placeholder="xyz@example.com"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input {...register("password")} id="password" type="password" />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full hover:cursor-pointer">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Link href={"/signup"}>signup</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}