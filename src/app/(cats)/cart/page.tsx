"use client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cart, cartResponse } from "@/types/type";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Addtocard() {
    const [data, setData] = useState<cart[]>([]);
    const [isShow, setisShow] = useState<boolean>(false);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/addtocart/${id}`);
            setData((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    useEffect(() => {
        const rawId = localStorage.getItem("id");
        if (rawId) {
            const id: string = JSON.parse(rawId);
            axios
                .get<cartResponse>(`http://localhost:3000/api/addtocart/${id}`)

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
                        <TableHead className="text-right">Functionality</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isShow && data.length > 0 ? (
                        data.map((invoice: cart, idx: number) => (
                            <TableRow key={idx}>
                                <TableCell className="font-medium">
                                    {invoice.image && (
                                        <div className="w-[100px] h-[100px] relative">
                                            <Image
                                                src={invoice.image}
                                                alt={invoice.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                                className="rounded-full object-contain"
                                            />
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{invoice.name}</TableCell>
                                <TableCell>{invoice.price}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleDelete(invoice._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <h1 className="text-center">You do not have data</h1>
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </div>
    );
}
