"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";

import { LogoutButton } from "./LogoutButton";
import { logout } from "@/actions/action";

export function SideBar() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Trainers",
      href: "/trainer",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "User",
      href: "/user",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add User",
      href: "/adduser",
      icon: (
        <IoMdAddCircleOutline  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

  ];

  const [open, setOpen] = useState(true); // Set to `true` by default for demonstration

  return (
    <div className="flex min-h-screen  top-0">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col min-h-screen  top-0 p-4 space-y-6">
          {/* Logo */}
          {open ? <Logo /> : <LogoIcon />}

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        <LogoutButton />
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="#"
    >
      <div  />
      <img
        src="/assets/Hackfit.jpg"
        className="w-40"
        alt="Avatar"
      />
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link href="#">
      <div  />
      <img
        src="/assets/Hackfit.jpg"
        className="w-40"
        alt="Avatar"
      />
    </Link>
  );
};
