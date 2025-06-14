"use client";
import Link from "next/link";
import logo from "../../public/default/images/logo.png";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [num, setNum] = useState(0);
    const [mounted, setMounted] = useState(false); // optional

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const id = localStorage.getItem("id");
            if (id) {
                setIsLogin(true);
            }

            const cartItems = localStorage.getItem("cartItems");
            if (cartItems) {
                try {
                    const parsedItems = JSON.parse(cartItems);
                    if (Array.isArray(parsedItems)) {
                        setNum(parsedItems.length);
                    }
                } catch (err) {
                    console.error("Invalid cartItems in localStorage", err);
                }
            }
        }
    }, []);

    function handleLogout() {
        axios
            .get("/api/users/logout")
            .then(() => {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("toggle");
                    localStorage.removeItem("id");
                    localStorage.removeItem("cartItems");
                }
                setIsLogin(false);
                window.location.href = "/login";
            })
            .catch((err) => console.log(err));
    }

    if (!mounted) return null;

    return (
        <div className="flex justify-between items-center bg-gray-100 shadow-2xl p-[10px]">
            <div>
                <Link href={"/"}>
                    <Image src={logo} alt="logo" width={60} />
                </Link>
            </div>

            <div className="text-[17px] font-medium w-[150px] flex justify-between">
                {isLogin ? (
                    <div className="flex items-center gap-4">
                        <span
                            onClick={handleLogout}
                            className="cursor-pointer text-red-600 font-medium hover:underline"
                        >
                            Logout
                        </span>
                        <Link href="/cart" className="relative text-2xl">
                            🛒
                            {num > 0 && (
                                <span className="absolute -top-2 -right-3 text-xs bg-yellow-400 text-black rounded-full h-5 w-5 flex items-center justify-center">
                                    {num}
                                </span>
                            )}
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link href={"/login"}>Login</Link>
                        <Link href={"/signup"}>Signup</Link>
                    </>
                )}
            </div>
        </div>
    );
}
