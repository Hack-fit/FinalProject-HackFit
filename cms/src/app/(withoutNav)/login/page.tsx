"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import React from "react";

export default function Page() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased min-h-screen">
    <div className="max-w-2xl mx-auto p-4">
      <div className="grid place-items-center">
        <img
          src="/assets/image.png"
          alt="Login Illustration"
          className="w-40 h-40 mb-0"
        />
      </div>
  
      <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        LOGIN
      </h1>
      <p></p>
      <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        Welcome to MailJet, the best transactional email service on the web.
        We provide reliable, scalable, and customizable email solutions for
        your business. Whether you&apos;re sending order confirmations,
        password reset emails, or promotional campaigns, MailJet has got you
        covered.
      </p>
      <input
        type="text"
        placeholder="email"
        className="text-white rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-white-700"
      />
      <input
        type="password"
        placeholder="password"
        className="text-white rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-white-700 mb-5"
      />
      <Link href={"/"}>
        <button className="btn btn-neutral w-full relative z-20">SUBMIT</button>
      </Link>
    </div>
    <BackgroundBeams className="absolute inset-0 z-0" />
  </div>
  )}

  /* <div className="flex min-h-screen items-center justify-center p-4">
  <div className="flex w-full max-w-6xl  rounded-xl shadow-2xl overflow-hidden">
    <div className="w-full md:w-1/2 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">LOGIN</h1>
      <div className="p-6 shadow-md rounded-lg border border-gray-200">
        <div className="space-y-4">
          <form className="space-y-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="Password"
              />
            </label>
            <div className="flex flex-col items-center justify-center">
              <button className="btn btn-neutral w-full">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* Bagian kanan */
//   <div className="hidden md:flex w-1/2 bg-items-center justify-center p-6">
//     <img
//       src="/assets/Hackfit.jpg"
//       alt="Login Illustration"
//       className="w-full h-auto"
//     />
//   </div>
//   // </div>
// </div> */}
  
