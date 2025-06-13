import Card from "@/components/Card";
import { Cat, CatResponse } from "@/types/type";
import axios from "axios";
// import img from "../../public/default/images"
// import Image from "next/image"; 

export default async function Home() {
  let cats: Cat[] | null = null;

  const res = await axios.get<CatResponse>("http://localhost:3000/api/cats");
  cats = res.data.catsData ?? null;

  return (
    <div>
      <div className="py-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome to our website
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] mx-auto">
          {cats?.map((e, idx) => <Card obj={e} key={idx} />)}
        </div>
      </div>

    </div>
  );
}
