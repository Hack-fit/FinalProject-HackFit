"use client";

import CardTrainer from "@/components/CardTrainer";
import CardUser from "@/components/CardUser";
import { useEffect, useState } from "react";


export type Trainers = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  specialist: string;
  phone_number: string;
  bio: string;
  profile_picture: string;
  role: string;
  location: string;
  speciality: string;
};

export type Users = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  bodyType: string;
  imageurl: string;
};

export default function Home() {
  const [data, setData] = useState<Trainers[]>([]);
  const [datas, setDatas] = useState<Users[]>([]);
  const [query, SetQuery] = useState("");

  async function fetchDataTrainer() {
    // console.log("masokkkkkk");

    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(link + `/api/trainer?name=${query}`);
    const data: { data: Trainers[] } = await res.json();
    setData(data.data);

    const response = await fetch(link + `/api/user?name=${query}`);
    const datas: { data: Users[] } = await response.json();
    setDatas(datas.data);
    // console.log(datas, '<><>USERS<><>')
  }
  async function fetchDataUser() {
    // console.log("masokkkkkk");

    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(link + `/api/user?name=${query}`);
    const datas: { data: Users[] } = await response.json();
    setDatas(datas.data);
    // console.log(datas, '<><>USERS<><>')
  }
  useEffect(() => {
    fetchDataUser;
    fetchDataTrainer();
  }, [query]);

  return (
    <div className="items-start h-screen">
      <div className="form-control mr-10 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => SetQuery(e.target.value)}
          className="input input-bordered w-1 md:w-auto"
        />

        {/* <h1 className="text-2xl font-bold mb-2">Trainer</h1> */}
        <main className="flex flex-col justify-start space-x-4">
          <h1 className="text-2xl font-bold mt-4">Trainer</h1>
          <div className="flex flex-wrap gap-4 justify-center mb-5 mt-5">
            {data.map((el: Trainers, id: number) => (
              <CardTrainer el={el} key={id} />
            ))}
          </div>
          <hr className="mt-5 mb-5"></hr>
          <h1 className="text-2xl font-bold mb-2">User</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {datas.map((el: Users, id: number) => (
              <CardUser el={el} key={id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
