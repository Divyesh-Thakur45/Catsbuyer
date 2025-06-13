"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cart, cartResponse } from "@/types/type";

export default function Addtocard() {
    const [data, setData] = useState<cart[]>([]);
    const [isShow, setisShow] = useState<boolean>(false);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/addtocart/${id}`);
            setData((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    useEffect(() => {
        const rawId = localStorage.getItem("id");
        if (rawId) {
            const id = JSON.parse(rawId);
            axios
                .get<cartResponse>(`/api/addtocart/${id}`)
                .then((res) => {
                    setData(res.data.cartData);
                    setisShow(res.data.success);
                })
                .catch((err) => {
                    console.error("Error fetching cart data:", err);
                    setisShow(false);
                });
        } else {
            console.warn("No user ID found in localStorage");
            setData([]);
            setisShow(false);
        }
    }, []);

    return (
        <div>
            <Table>
                <TableCaption>Add to cart data</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isShow && data.length > 0 ? (
                        data.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <h1 className="text-center">No cart data found.</h1>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
