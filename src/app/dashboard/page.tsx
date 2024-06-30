"use client";
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Progress } from "@/components/ui/progress"

 
function dashboard() {

  const {user} = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve)=>setTimeout(resolve, 1000));
      setLoading(false);
    }
  checkAuthentication();
  }, [user]);
  

  return (
    <div className="bg-gradient-to-br from-[#9EF01A] to-[#38B000] h-screen w-screen p-5 md:p-20">
      {loading? (<Progress value={33} />) : !user ? <p>This is a protected page, login to see this page</p> :
      <p>{user.displayName}'s dashboard</p>
      }
      
      </div>
  )
}

export default dashboard