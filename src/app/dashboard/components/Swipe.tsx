import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useSwipeable } from 'react-swipeable';
import { Input } from '@/components/ui/input';



interface SwipeProps {
    onStepChange: (step: number) => void;
    updateCSV: (temp: object[]) => void;
    data: any;
    
}

const Swipe: React.FC<SwipeProps> = ({ onStepChange, updateCSV, data }) => {

    const [currentData, setCurrentData] = useState<any>([]);
    const [row, setRow] = useState<any>(data[1]);
    const [curr, setCurr] = useState<number>(1);
    const [isCredit, setIsCredit] = useState<boolean>();

    const [category1, setCategory1] = useState('Food');
    const [category2, setCategory2] = useState('Transport');


    const handleCategory1Change = (e: React.ChangeEvent<HTMLInputElement>) => setCategory1(e.target.value);
    const handleCategory2Change = (e: React.ChangeEvent<HTMLInputElement>) => setCategory2(e.target.value);

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



    const config = {
        delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
        trackTouch: true,                      // track touch input
        trackMouse: true,                     // track mouse input
        rotationAngle: 0,                      // set a rotation angle
        swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    }



    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            console.log("User Swiped!", eventData);

            switch (eventData.dir) {
                case "Down": if (curr - 1 >= 0) setCurr(curr - 1); break;
                case "Up": handleChoice("Skip"); break;
                case "Right": handleChoice(category2); break;
                case "Left": handleChoice(category1); break;
                default: console.log("Unexpected direction");
            }
        },
        ...config,
    });


    useEffect(() => {
        console.log("Current Data :", currentData)
        if (curr >= 0 && curr < data.length) {
            setRow(data[curr]);
            setIsCredit((data[curr]?.["_2"]?.trim() || "").length != 0)
        }
    }, [curr])

    const nextStep = () => {

        console.log("next step clicked", currentData)
        updateCSV(currentData);
        onStepChange(3)
    }


    return (



        <div
            className='w-full min-h-[66vh] 
                        flex flex-col 
                        font-general

                        '>

            {curr == data.length ?
                <Button onClick={() => nextStep()}> Move to the next step </Button> :
                <div className='w-full -full  grow select-none self-center justify-center items-center flex flex-col'>
                    
                    <div {...handlers} className='md:w-2/3 rounded-lg shadow-xl bg-white 
                                                    
                                                    w-full h-2/3 
                                                    flex flex-col justify-between '>
                        <div className='py-10 px-5'>
                            {
                                isCredit ? <div className='text-6xl h-2/3 font-semibold text-center text-green-600'>
                                    + {row?.["_2"]}
                                </div>
                                    : <div className='text-6xl font-semibold text-center text-red-600'>
                                        - {row?.["_1"]}
                                    </div>

                            }
                        </div>

                        <div className='bg-accent/10 pt-5 pb-10 px-5'>
                            < h1 className="text-xl font-bold">{row?.["_3"]}</h1>
                            <h2 className="font-medium">{row?.[""]}    </h2>
                        </div>


                    </div>

                    <div className='bg-white rounded-lg py-5 px-10 my-10 w-full'>
                        <p className='text-center font-gambetta font-medium'>Set what each direction means</p>
                        <div className='flex flex-col md:flex-row '>
                            
                            <div className='flex flex-row mt-5 mx-1 items-baseline justify-between bg-secondary/40 text-accent p-3 rounded-md '>
                                <h3 className='mx-2 w-contain font-medium text-nowrap'>Left Swipe</h3>
                                <Input className='mx-2 w-1/2 text-accent' value={category1} onChange={handleCategory1Change} />
                            </div>

                            <div className='flex flex-row mt-5 mx-1 items-baseline justify-between bg-secondary/40 text-accent p-3 rounded-md '>
                                <h3 className='mx-2 w-contain font-medium text-nowrap'>Right Swipe</h3>
                                <Input className='mx-2 w-1/2 text-accent' value={category2} onChange={handleCategory2Change} />
                            </div>
                            
                                <div className='flex flex-row mt-5 mx-1 grow items-center justify-between p-3  rounded-md bg-secondary/40 text-accent'>
                                    <h3 className='mx-2 w-contain font-medium text-nowrap'>Up</h3>
                                    <p className='mx-2 w-1/2 ' > Skip Txn</p>
                                </div>
                                <div className='flex flex-row mt-5 mx-1 grow items-center justify-between p-3  rounded-md bg-secondary/40 text-accent'>
                                    <h3 className='mx-2 w-contain font-medium text-nowrap'>Down</h3>
                                    <p className='mx-2 w-1/2' > Previous Txn </p>
                                </div>
                        </div>

                    </div>



                </div>}
        </div>
    )
}

export default Swipe






