"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserAuth } from "./context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {useGSAP} from "@gsap/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Home() {
  const hero = useRef<HTMLDivElement>(null);

  const { user, googleSignIn, googleSignOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  const [myTrigger, setMyTrigger] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }

    setMyTrigger(true);
  };

  const handleSignOut = async () => {
    try {
      await googleSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (user) setMyTrigger(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  // useGSAP(()=>{

  //   let animSection = document.getElementById("heroContainer");
  //   gsap.to(animSection, {opacity:"0%",duration:1});

  // },{scope:hero})

  return (
    <div ref={hero} className="bg-secondary flex h-screen w-screen ">
      <div id="heroContainer" 
      className="h-2/3 w-screen 
      self-end 
      bg-primary 
      container 
      shadow-2xl 
      border-2 border-solid border-red-400
      flex flex-col justify-center">
        <div>

        

        <h1 className="text-2xl md:text-6xl font-general  font-extrabold text-accent ">
          Categorise your Spends via Swipes
        </h1>
        <h2 className="text-sm md:text-xl font-semibold font-gambetta text-accent md:w-1/2 mt-3 ">
          An expense tracker that lets you swipe your transactions into
          different categories and understand where your money goes
        </h2>
        {!user ? (
          <Button
            variant="outline"
            className="w-1/2 md:w-1/4 my-5 
            font-general 
            bg-secondary 
            font-semibold 
            shadow-lg border 
            border-solid border-secondary 
            hover:bg-primary rounded-full "
            onClick={() => handleSignIn()}
          >
            Let&apos;s begin!
          </Button>
        ) : (
          <>
            <Dialog open={myTrigger} onOpenChange={setMyTrigger}>
              <DialogTrigger />
              <DialogContent className="bg-primary border-secondary border-solid border-4 text-accent rounded-lg">
                <DialogHeader>
                  <DialogTitle>
                    Welcome back, {user ? user.displayName : " "} !
                  </DialogTitle>
                  <DialogDescription className="text-accent/80">
                    You are being redirected to your dashboard now!
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="font-general 
                    bg-accent 
                    text-primary 
                    rounded-[20rem] 
                    font-semibold 
                    border border-solid border-secondary 
                    shadow-sm 
                    hover:bg-secondary/20 hover:text-accent"
                    type="submit"
                    onClick={() => navigate.push("/dashboard")}
                  >
                    Take me to the dashboard!
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              className="w-1/2 md:w-1/4 my-5 font-general 
              bg-secondary/20 
              font-semibold 
              border border-solid border-secondary/40 
              shadow-sm 
              hover:bg-secondary/90 hover:text-primary rounded-full "
              onClick={() => navigate.push("/dashboard")}
            >
              Go to Dashboard!
            </Button>
          </>
        )}
      </div>
      </div>
      {/* center */}
    </div>
  );
}
