"use client";
import { Cat } from "@/types/type";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

type CardProps = {
    obj: Cat;
};

export default function Card({ obj }: CardProps) {
    const [index, setIndex] = useState(0)
    const Addtocard = async (id: string, num: number) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/cats/${id}`)
            const image = res.data.catsData.images[num]
            const name = res.data.catsData.name
            const price = res.data.catsData.price
            const loginID = JSON.parse(localStorage.getItem("id") as string)
            const obj = {
                image, name, price, loginID
            }
            if (res.data.success) {
                const addData = await axios.post(`http://localhost:3000/api/addtocart`, obj)
                alert(addData.data.message)
                console.log(addData.data)
            }
        } catch (error) {
            console.log("Error in add to cart :", error)

        }
    }
    return (
        <div>
            <div
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4"
            >
                <div className="flex justify-center">
                    <Image
                        src={obj.images[index]}
                        alt={obj.name}
                        width={200}
                        height={200}
                        className="rounded-xl object-cover"
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    <span className="h-[20px] w-[20px] rounded-full bg-gray-200 border hover:cursor-pointer" onClick={() => setIndex(0)}></span>
                    <span className="h-[20px] w-[20px] rounded-full bg-black border hover:cursor-pointer" onClick={() => setIndex(1)}></span>
                    <span className="h-[20px] w-[20px] rounded-full bg-orange-300 border hover:cursor-pointer" onClick={() => setIndex(2)}></span>
                </div>

                <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-gray-700">{obj.name}</p>
                    <p className="text-md text-green-600 font-medium">{obj.price}</p>
                </div>

                <div className="flex justify-center mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition" onClick={() => Addtocard(obj._id, index)}>
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}