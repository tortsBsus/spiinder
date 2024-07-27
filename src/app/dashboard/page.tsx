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
  const [step, setStep] = useState<number>(1);
  const navigate = useRouter();
  const [csvData, setCsvData] = useState<Object>({});
  const [categories, setCategories] = useState<string[]>(["Cat1", "Cat2"])


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

  const updateCSVdata = (data: Object) => {
    setCsvData(data);
  }

  const updateCategories = (newCats: string[]) => {
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

    <div className="font-general bg-secondary min-h-screen max-w-screen">



      {
        !user ? <p>This is a protected page, login to see this page</p> :
          // Dashboard ------------------------------------------------------------------------------------------------------------------------------------------>
          <div className=' flex flex-col max-w-screen min-h-screen justify-between'>
            <div className='p-5 rounded-b-sm bg-primary'>

            
            {/* ------------------------------------------------------------- Breadcrumb ------------------------------------------------------------- */}
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
            <div className='flex justify-between align-middle items-center my-2'>

              {/* ------------------------------------------------------------- Title ------------------------------------------------------------- */}
              <div className=' font-gambetta w-2/3'>
                <h1 className='text-xl font-bold mt-2' >{user.displayName}&apos;s Dashboard</h1>
              </div>

              {/* ------------------------------------------------------------- Footer ------------------------------------------------------------- */}
              <div className='flex flex-col justify-end align-end items-end h-full w-1/3 '>
                <Button variant="outline" className="md:w-full  text-wrap bg-secondary/20 border border-solid border-secondary rounded-full hover:bg-secondary/80 font-semibold  " onClick={() => handleSignOut()}>Sign Out?</Button>
              </div>
            </div>

            </div>
            {/* ------------------------------------------------------------- Content ------------------------------------------------------------- */}
            <div className='container bg-secondary/80 min-h-screen max-w-full rounded-lg grow p-5 flex flex-col items-center justify-center'>
            
              {step == 1 && <>
                <Upload onStepChange={updateSteps} updateCSV={updateCSVdata} />
              </>}
            

              {step == 2 && <>
                <Categories onStepChange={updateSteps} updateCategories={updateCategories} />
              </>}
              {step == 3 && <>
              
                <Swipe onStepChange={updateSteps} updateCSV={updateCSVdata} data={csvData} categories={categories} />
              </>}
              {step == 4 && <>
                <Display onStepChange={updateSteps} csvData={csvData} />
              </>}
            </div>

          </div>
      }




    </div>

  )
}

export default Dashboard;







