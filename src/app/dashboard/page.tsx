"use client";
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import Swipe from './components/Swipe';
import Upload from './components/Upload';
import Display from "./components/Display";
import Categories from './components/Categories';




function Dashboard() {

  const { user, googleSignOut } = UserAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const navigate = useRouter();
  const [csvData, setCsvData] = useState<Object>({});
  const [categories, setCategories] = useState<string[]>(["Cat1","Cat2","Cat3","Cat4"])


  const handleSignOut = async () => {
    try {
      await googleSignOut()
    }
    catch (error) {
      console.log(error);
    }

    navigate.push("/");

  }


  const updateSteps = (step: number) => {
    setStep(step);
  }

  const updateCSVdata = (data:Object) => {
    setCsvData(data);
  }

  const updateCategories = (newCats:string[]) => {
    setCategories(newCats);
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    }
    checkAuthentication();
  }, [user]);







  return (

    <div className="bg-gradient-to-br from-[#9EF01A] to-[#38B000] min-h-screen w-screen p-2 md:px-10 md:pt-5">




      {
        loading ? (<Progress value={33} />) : !user ?

          <p>This is a protected page, login to see this page</p> :
          // Dashboard ------------------------------------------------------------------------------------------------------------------------------------------>
          <div className='flex flex-col border-white border-2 border-solid min-h-screen justify-between rounded-lg bg-white p-5'>
            {/* ------------------------------------------------------------- Header ------------------------------------------------------------- */}
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Begin</BreadcrumbLink>
                  </BreadcrumbItem>

                  {step > 0
                    && (
                      step == 1 ?
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage>Upload</BreadcrumbPage>
                          </BreadcrumbItem>
                        </> : <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => setStep(1)}>Upload</BreadcrumbLink>
                          </BreadcrumbItem>
                        </>)}
                  {step > 1 && (step == 2 ?
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Categories</BreadcrumbPage>
                      </BreadcrumbItem>
                    </> : <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => setStep(2)}>Categories</BreadcrumbLink>
                      </BreadcrumbItem>
                    </>)}
                  {step > 2 && (step == 3 ?
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Swipe</BreadcrumbPage>
                      </BreadcrumbItem>
                    </> : <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => setStep(3)}>Swipe</BreadcrumbLink>
                      </BreadcrumbItem>
                    </>)}
                    {step > 3 && (step == 4 ?
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Graphs</BreadcrumbPage>
                      </BreadcrumbItem>
                    </> : <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => setStep(4)}>Graphs</BreadcrumbLink>
                      </BreadcrumbItem>
                    </>)}
                </BreadcrumbList>
              </Breadcrumb>
              {/* ------------------------------------------------------------- Title ------------------------------------------------------------- */}
              <h1 className='text-xl font-bold mt-2' >{user.displayName}&apos;s dashboard</h1>
            </div>

            {/* ------------------------------------------------------------- Content ------------------------------------------------------------- */}
            <div className='bg-[#38B000]/80 max-h-full max-w-full rounded-lg grow p-5 flex flex-col items-center justify-center'>
              {step == 0 && <>
                <Button onClick={() => setStep(1)}> Start new project </Button>
              </>}
              {step == 1 && <>
                <Upload onStepChange={updateSteps} updateCSV = {updateCSVdata} />
              </>}
              
              {step == 2 && <>
                <Categories onStepChange={updateSteps} updateCategories={updateCategories} />
              </>}
              {step == 3 && <>
                <Swipe onStepChange={updateSteps} updateCSV = {updateCSVdata} data={csvData} categories={categories} />
              </>}
              {step == 4 && <>
                <Display onStepChange={updateSteps} csvData={csvData} />
              </>}
            </div>
            {/* ------------------------------------------------------------- Footer ------------------------------------------------------------- */}
            <Button variant="outline" className="max-w-full text-wrap bg-[#38B000] mt-5" onClick={() => handleSignOut()}>Sign Out as {user.displayName}?</Button>
          </div>
      }




    </div>

  )
}

export default Dashboard;







