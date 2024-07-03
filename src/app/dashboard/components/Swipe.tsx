import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

interface SwipeProps{
    onStepChange : (step:number) => void;
    updateCSV : (temp:object[]) => void;
    data : any;
    categories : string[];
}

const Swipe : React.FC<SwipeProps> = ({ onStepChange, updateCSV, data, categories }) => {

    const [currentData, setCurrentData] = useState<any>([]);
    const [row, setRow] = useState<any>(data[0]);
    const [curr, setCurr] = useState<number>(0);

    const swipeTxn = () => {

        if (curr < data.length ) {
            setCurr(curr + 1);
        }
        else
        alert("Transactions have been sorted!");


    }

    const registerCategorisation =  (location:number, category:string) => {
        console.log("Received: ",location," ",category);
        console.log("Data before registration : Main:",data," temp ver: ",currentData);
        currentData.push(row);
        currentData[location]["category"] = category;
        console.log("Data before registration : Main:",data," temp ver: ",currentData);
    }

    const updateRow = () => {
        if(curr>=0 && curr < data.length) setRow(data[curr]);
    }

    const handleChoice = (value:string) => {
        
        //Register choice
        console.log("Current txn:", row," ",curr," ",data.length);
        console.log("Choice made:",value);
        registerCategorisation(curr, value);


        //Move to next Txn
        console.log("Moving to the next transaction");
        swipeTxn();
        updateRow();
        
        // console.log(row, x, data, Data);
    }
    
    const nextStep = () => {

        console.log("next step clicked",currentData)
        updateCSV(currentData);
        onStepChange(4)
    } 

    
    return (

        <div className='my-24 border-white border-2 border-solid p-10 rounded-lg bg-white'>
            <h1 className='font-bold text-xl my-10'>Swipe interface</h1>

            current transaction :
          
            <div className='flex flex-wrap'>
                <div className=' border-[white] border-2 border-solid rounded-lg p-2 m-2 shadow-xl '>
                    <div className="font-medium">{row[""]}</div>
                    <div>{row["_1"]}</div>
                    <div>{row["_2"]}</div>
                    <div className="">{row["_3"]}</div>
                    <div className="mt-5">
                        <h3 className='font-semibold'>Assign a category - </h3>
                        <div className='flex'>
                            <Button className='mx-1' onClick={() => handleChoice(categories[0])}> {categories[0]} </Button>
                            <Button className='mx-1' onClick={() => handleChoice(categories[1])}> {categories[1]} </Button>
                            <Button className='mx-1' onClick={() => handleChoice(categories[2])}> {categories[2]} </Button>

                        </div>
                        <Button className='my-2 w-full' onClick={() => handleChoice("Skip")}> Skip for now </Button>
                    </div>
                </div>






            </div>
            <Button className='' onClick={() => nextStep()}> Move to the next step </Button>


        </div>
    )
}

export default Swipe