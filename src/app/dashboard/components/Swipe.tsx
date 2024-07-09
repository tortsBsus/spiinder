import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Splide, SplideSlide } from '@splidejs/react-splide';





interface SwipeProps {
    onStepChange: (step: number) => void;
    updateCSV: (temp: object[]) => void;
    data: any;
    categories: string[];
}

const Swipe: React.FC<SwipeProps> = ({ onStepChange, updateCSV, data, categories }) => {

    const [currentData, setCurrentData] = useState<any>([]);
    const [row, setRow] = useState<any>(data[1]);
    const [curr, setCurr] = useState<number>(1);
    

    const swipeTxn = () => {

        if (curr < data.length) {
            setCurr(curr + 1);
        }
        else
            alert("Transactions have been sorted!");


    }

    const handleChoice = (value: string) => {

        //Register choice
        console.log("Current txn:", row, " ", curr, " ", data.length);
        console.log("Choice made:", value);

        let temp = row;
        temp.category = value;

        let x = currentData;
        x.push(row);
        setCurrentData(x);

        console.log(" temp ver: ", currentData);

        //Move to next Txn
        console.log("Moving to the next transaction");
        swipeTxn();

    }

    const nextStep = () => {

        console.log("next step clicked", currentData)
        updateCSV(currentData);
        onStepChange(4)
    }

    useEffect(() => {
        console.log("Current Data :", currentData)
        if (curr >= 0 && curr < data.length) setRow(data[curr]);
    }, [curr])
    

    return (

        
            
        <div className='w-full h-full flex flex-col'>
        
        {curr == data.length ? <Button className='' onClick={() => nextStep()}> Move to the next step </Button> : 
            <div className='w-full h-full grid grid-cols-4 grid-rows-9 gap-2 grow '>
                {/* <div className='col-span-2 row-span-1 text-center col-start-2'>↑ Skip Txn  </div> */}
                <div className='col-span-1 row-span-1 text-center row-start-5'>← <Button className='mx-1' onClick={() => handleChoice(categories[0])}> {categories[0]} </Button> </div>
                <div className=' col-span-2 row-span-9 row-start-2 rounded-lg py-10 px-5 m-2 shadow-xl bg-white w-full flex flex-col justify-between '>
                <div className="text-xl font-bold">{row?.["_3"]}</div>
                    <div className="font-medium">{row?.[""]}</div>
                    
                    <div>{row?.["_1"]}</div>
                    <div>{row?.["_2"]}</div>
                    
                    <Button className='my-2 w-full' onClick={() => handleChoice("Skip")}> Skip for now </Button>

                </div>
                <div className=' col-span-1 row-span-1 text-center row-start-5 col-start-4'><Button className='mx-1' onClick={() => handleChoice(categories[1])}> {categories[1]} </Button> → </div>
                {/* <div className=' col-span-2 row-span-1 text-center row-start-9 col-start-2'> ↓  Previous Txn </div> */}

        </div> }
        </div>
    )
}

export default Swipe