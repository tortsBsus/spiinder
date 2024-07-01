"use client";
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';



function Dashboard() {

  const { user, googleSignOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();

  
  const handleSignOut = async () => {
    try {
      await googleSignOut()
    }
    catch (error) {
      console.log(error);
    }

    navigate.push("/");

  }


  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    }
    checkAuthentication();
  }, [user]);






  return (
    <div className="bg-gradient-to-br from-[#9EF01A] to-[#38B000] min-h-screen w-screen p-5 md:p-20">

      {user ?  <Button variant="outline" className="w-1/2 md:w-1/4 text-wrap" onClick={() => handleSignOut()}>Sign Out {user.displayName}!</Button> : <p>Login to see this page </p>}

      {/* {loading? (<Progress value={33} />) : !user ? <p>This is a protected page, login to see this page</p> :
      <div>
        <h1>{user.displayName}&apos;s dashboard</h1>
        <h2>Upload a CSV file where transactions are formatted as shown in the example</h2>
        <Button variant="outline" className="w-1/2 md:w-1/4 text-wrap" onClick={() => alert("Uploading file")}>Upload a CSV file </Button>
      </div>
      } */}

     

    </div>
  )
}

export default Dashboard







