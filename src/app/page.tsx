"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserAuth } from './context/AuthContext';
import { useEffect, useState } from "react";



export default function Home() {
  const { user, googleSignIn, googleSignOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    }
    catch (error) {
      console.log(error);
    }

  }


  const handleSignOut = async () => {
    try {
      await googleSignOut()
    }
    catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve)=>setTimeout(resolve, 10000));
      setLoading(false);
    }
  checkAuthentication();
  }, [user]);

  

  return (
    <div className="bg-gradient-to-br from-[#9EF01A] to-[#38B000] h-screen w-screen p-5 md:p-20">
      {/* center */}
      <div className="h-full w-full flex flex-col justify-center items-center bg-black/35 rounded-lg p-2">
        <h1 className="text-2xl md:text-6xl font-extrabold text-white text-center">Categorise your spends via swipes</h1>
        <h2 className="text-sm md:text-xl text-center font-medium text-white my-2 md:my-4 md:w-1/2"> an expense tracker that lets you swipe your transactions into different categories and understand where your money goes</h2>
    {loading?(<p>loading!</p>) : !user ? 
        <Button variant="outline" className="w-1/2 md:w-1/4" onClick={() => handleSignIn()}>Let's begin!</Button> :
        
        <Button variant="outline" className="w-1/2 md:w-1/4 text-wrap" onClick={() => handleSignOut()}>Sign Out {user.displayName}!</Button>
    }
    
      </div>
    </div>
  );
}
