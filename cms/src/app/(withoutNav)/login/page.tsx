"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const res = await fetch(link + "/api/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "An error occurred");
      }

      const data = await res.json();
      router.push("/");
      Swal.fire({
        title: "Login Success",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error: any) {
      Swal.fire({
        title: error.message || "Login failed",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-800 relative flex flex-col items-center justify-center antialiased min-h-screen">
      <div className="max-w-2xl mx-auto p-4 -mt-28">
        <div className="grid place-items-center">
          <img
            src="/assets/qwerty.png"
            alt="Login Illustration"
            className="md:w-96 w-64"
          />
        </div>

        <h1 className="relative -mt-16 z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            className="text-white rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-white-700 text-center"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="text-white rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-white-700 mb-5 text-center"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <button className="btn btn-neutral w-full relative z-20" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
      <BackgroundBeams className="absolute inset-0 z-0" />
    </div>
  );
}
