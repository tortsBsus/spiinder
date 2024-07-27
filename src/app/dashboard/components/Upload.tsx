"use client"
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import ExampleFile from "./Example";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"




interface UploadProps {
  onStepChange: (step: number) => void;
  updateCSV: (temp: object[]) => void;
}
const Upload: React.FC<UploadProps> = ({ onStepChange, updateCSV }) => {

  const [error, setError] = useState(null);

  const [uploadMethod, setUploadMethod] = useState("");

  const [receivedData, setReceivedData] = useState<any[]>([]);

  const [myCSVTrigger, setMyCSVTrigger] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Access the selected file

    if (!file) return; // Handle no file selected

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return; // Handle empty result if any

      const parsedData: any = Papa.parse(result, { header: true }).data;
      setReceivedData(parsedData); 
      console.log(parsedData);
      setError(null); // Clear any previous errors
    };
    reader.onerror = (err: any) => {
      setError(err.message); // Handle file read error
    };
    reader.readAsText(file); // Read file as text
  };

  const checkUpload = () => {

    if(receivedData.length!=0){
      console.log(receivedData);
      updateCSV(receivedData);
      onStepChange(2);
    }
    else alert("Nothing to be categorised!");
  }



  useEffect(() => {

    switch (uploadMethod) {
      case "Sheets": console.log(uploadMethod); break;
      case "Statement":  console.log(uploadMethod); break;
      case "CSV": setMyCSVTrigger(true); console.log(uploadMethod);
        break;
      case "Example":setReceivedData(ExampleFile); console.log(uploadMethod); break;
      default: console.log("Invalid choice");
    }

  }, [uploadMethod])

  return (
    <>
      <div className=' font-general flex flex-col md:flex-row justify-center  w-full'>
        {/* ------------------------------------------------------------- Upload CSV ------------------------------------------------------------- */}
        <Card className={`m-3 grow  ${uploadMethod == "CSV" ? "bg-primary/45 border-2 border-solid border-accent" : "hover:-translate-y-2 hover:translate-x-1 hover:bg-slate-200"}`} onClick={() => setUploadMethod("CSV")}>
          <CardHeader>
            <CardTitle>Upload CSV</CardTitle>
            <CardDescription className={`font-gambetta ${uploadMethod == "CSV" && "text-slate-900"}`}>Upload your CSV file that is in the specified format</CardDescription>
          </CardHeader>
          <CardContent>
            
          </CardContent>
        </Card>
        {/* ------------------------------------------------------------- Google Sheets ------------------------------------------------------------- */}
        {/* <Card className={`m-3 grow  ${uploadMethod == "Sheets" ? "bg-primary/45 border-2 border-solid border-accent" : "hover:-translate-y-2 hover:translate-x-1 hover:bg-slate-200"}`} onClick={() => setUploadMethod("Sheets")}>
          <CardHeader>
            <CardTitle>Google Sheets</CardTitle>
            <CardDescription className={`font-gambetta ${uploadMethod == "Sheets" && "text-slate-900"}`}>Connect a spreadsheet with your data</CardDescription>
          </CardHeader>

        </Card> */}
        {/* ------------------------------------------------------------- Example ------------------------------------------------------------- */}
        <Card className={`m-3 grow  ${uploadMethod == "Example" ? "bg-primary/45 border-2 border-solid border-accent" : "hover:-translate-y-2 hover:translate-x-1 hover:bg-slate-200"}`} onClick={() => setUploadMethod("Example")}>
          <CardHeader>
            <CardTitle>Example File</CardTitle>
            <CardDescription className={`font-gambetta ${uploadMethod == "Example" && "text-slate-900"}`}>Try Spiinder using a sample file!</CardDescription>
          </CardHeader>
        </Card>
        {/* ------------------------------------------------------------- PDF ------------------------------------------------------------- */}
        {/* <Card className={`m-3 grow  ${uploadMethod=="Statement" ? "bg-primary/45 border-2 border-solid border-accent" : "hover:-translate-y-2 hover:translate-x-1 hover:bg-slate-200"}`} onClick={()=>setUploadMethod("Statement")}>
          <CardHeader>
            <CardTitle>PDF Bank Statement</CardTitle>
            <CardDescription className={`font-gambetta ${uploadMethod=="Statement" && "text-slate-900"}`}>Upload your Bank statement and it will be parsed automatically!</CardDescription>
          </CardHeader>
        </Card> */}
      </div>
      <Dialog open = {myCSVTrigger} onOpenChange={setMyCSVTrigger}>        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file from your device that adheres to this format
            </DialogDescription>
          </DialogHeader>
<Input id="BudgetFile" type="file" accept=".csv" onChange={handleFileChange} />
          {error && <p>{error}</p>}
        </DialogContent>
      </Dialog>

     {receivedData.length != 0 && <Button className='m-10 w-full bg-accent text-primary hover:text-accent' onClick={() => checkUpload()}> Move to the next step </Button> } 
    </>
  )
}

export default Upload