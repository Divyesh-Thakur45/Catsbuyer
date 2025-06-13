"use client";
import Link from "next/link";
import logo from "../../public/default/images/logo.png"
import Image from "next/image";
import axios from "axios";
// import { useEffect, useState } from "react";

export default function Header() {
    // const [toggle, setToggle] = useState(false)
    const isLogin = JSON.parse(localStorage.getItem("id") as string)
    function handleLogout() {
        axios
            .get("/api/users/logout")
            .then(() => {
                localStorage.removeItem("toggle")
                localStorage.removeItem("id")
                window.location.href = "/login";
            })
            .catch((err) => console.log(err));
        // setToggle(false)
    }
    // useEffect(() => {

    //     console.log(toggle)
    //     const isToggle = JSON.parse(localStorage.getItem("toggle") as string)
    //     console.log(toggle)
    //     if (isToggle) {
    //         setToggle(true)
    //     }
    // }, [])

    return (
        <div className="flex justify-between items-center bg-gray-100 shadow-2xl p-[10px]">
            <div>
                <Link href={"/"}>
                    <Image src={logo} alt="logo" width={60} />
                </Link>
            </div>
            <div className="text-[17px] font-medium w-[130px] flex justify-between">
                {/* <span onClick={handleLogout}>logout</span>
                <Link href={"/cart"}>🛒</Link>
                <Link href={"/login"}>Login</Link>
                <Link href={"/signup"}>Signup</Link> */}
                {isLogin &&
                    <>
                        <span onClick={handleLogout}>logout</span>
                        <Link href={"/cart"}>🛒</Link>
                    </>
                }
                {!isLogin &&
                    <>
                        <Link href={"/login"}>Login</Link>
                        <Link href={"/signup"}>Signup</Link>
                    </>
                }
                {/* {toggle ?
                    (<>
                        <span onClick={handleLogout}>logout</span>
                        <Link href={"/cart"}>🛒</Link>
                    </>) :
                    (<>
                        <Link href={"/login"}>Login</Link>
                        <Link href={"/signup"}>Signup</Link>
                    </>)
                } */}
            </div>
        </div>
    )
}

