"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserAuth } from './context/AuthContext';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"





export default function Home() {
  const { user, googleSignIn, googleSignOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  const [myTrigger, setMyTrigger] = useState(false);
  // useEffect(() => {

  //   if (user) {
  //     console.log(user);
  //     navigate.push("/dashboard");

  //   }

  // }, [user]);

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    }
    catch (error) {
      console.log(error);
    }

    setMyTrigger(true);

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
      if(user)setMyTrigger(true);
      await new Promise((resolve) => setTimeout(resolve, 10000));
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
        {!user ?
          <Button variant="outline" className="w-1/2 md:w-1/4" onClick={() => handleSignIn()}>Let&apos;s begin!</Button> :<>
          <Dialog open = {myTrigger} onOpenChange={setMyTrigger}>
            <DialogTrigger/>
            <DialogContent className="bg-[#38B000] border-[#38B000] border-2 border-solid text-white">
              <DialogHeader>
                <DialogTitle>Welcome back, {user ? user.displayName : " "} !</DialogTitle>
                <DialogDescription className="text-white">
                  You are being redirected to your dashboard now!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button className="bg-[#0e4118] shadow-lg border-[#38B000] border-2 border-solid text-white" type="submit" onClick = { ()=> navigate.push("/dashboard") }>Take me to the dashboard!</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="w-1/2 md:w-1/4" onClick={()=> navigate.push("/dashboard")}>Go to Dashboard!</Button>
          </>
        }

      </div>
    </div>
  );
}
