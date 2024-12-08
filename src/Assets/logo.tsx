"use client";
import { useTheme } from "next-themes";
import lightLogo from "./1.png";
import darkLogo from "./2.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Logo = () => {
  const { theme } = useTheme();

  const [logo, setLogo] = useState(theme === "light" ? lightLogo : darkLogo);


  useEffect(()=>{
    if(theme === "dark"){
      setLogo(lightLogo)
    }else{
      setLogo(darkLogo)
    }
  },[theme])



  return (
    <Link href="/">
      <Image
        className=""
        src={logo}
        alt="Logo"
        width={250}
        height={200}
      />
    </Link>
  );
};
