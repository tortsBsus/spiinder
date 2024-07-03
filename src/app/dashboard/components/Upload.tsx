"use client"
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

interface UploadProps{
    onStepChange : (step:number) => void;
    updateCSV : (temp:object[]) => void;
}
const Upload : React.FC<UploadProps> = ({ onStepChange, updateCSV }) => {

    const [error, setError] = useState(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Access the selected file
      
        if (!file) return; // Handle no file selected
      
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (!result) return; // Handle empty result if any
      
          const parsedData:any = Papa.parse(result, { header: true }).data;
          updateCSV(parsedData); // Update CSV data in parent component
          console.log(parsedData.length); // Output parsed data length
          setError(null); // Clear any previous errors
        };
        reader.onerror = (err:any) => {
          setError(err.message); // Handle file read error
        };
        reader.readAsText(file); // Read file as text
      };

    return (
        <div className='border-white border-2 border-solid p-10 rounded-lg bg-white'>
           <div className=' my-10'>
        <h1 className='font-bold text-xl'>Upload Interface</h1>
        <h2>Upload your CSV file that is in the specified format</h2>
        </div>
            <div>
                <Input id="BudgetFile" type="file" accept=".csv" onChange={handleFileChange} />
                {error && <p>{error}</p>}
            </div>
            <Button className='my-5' onClick={() => onStepChange(2)}> Move to the next step </Button>


        </div>
    )
}

export default Upload