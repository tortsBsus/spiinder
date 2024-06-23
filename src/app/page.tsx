"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div style={{
      background: 'linear-gradient(315deg, hsla(0, 87%, 45%, 1) 20%, hsla(25, 83%, 57%, 1) 100%)',
      // MozBackground: 'linear-gradient(315deg, hsla(0, 87%, 45%, 1) 20%, hsla(25, 83%, 57%, 1) 100%)',
      // WebkitBackground: 'linear-gradient(315deg, hsla(0, 87%, 45%, 1) 20%, hsla(25, 83%, 57%, 1) 100%)',
      filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#d60f0f", endColorstr="#ec8235", GradientType=1)',

    }} className="h-screen w-screen p-5 md:p-20">
      {/* center */}
      <div className="h-full w-full flex flex-col justify-center items-center bg-black/35 rounded-lg p-2">
        <h1 className="text-2xl md:text-6xl font-extrabold text-white text-center">Categorise your spends via swipes</h1>
        <h2 className="text-sm md:text-xl text-center font-medium text-white my-2 md:my-4 md:w-1/2"> an expense tracker that lets you swipe your transactions into different categories and understand where your money goes</h2>

        <Button variant="outline" className="w-1/2 md:w-1/4" onClick={()=>alert("Waitlist coming soon!")}>Join the waitlist!</Button>
      </div>
    </div>
  );
}
