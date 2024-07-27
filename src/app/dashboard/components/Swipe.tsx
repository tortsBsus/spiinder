import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useSwipeable } from 'react-swipeable';



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
    const [isCredit, setIsCredit] = useState<boolean>();

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
                case "Right": handleChoice(categories[1]); break;
                case "Left": handleChoice(categories[0]); break;
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
        onStepChange(4)
    }


    return (



        <div
            className='w-full h-[66vh] 
                        flex flex-col 

                        '>

            {curr == data.length ?
                <Button onClick={() => nextStep()}> Move to the next step </Button> :
                <div className='w-full md:w-3/5 h-full  grow select-none self-center justify-center flex flex-col '>

                    <div {...handlers} className='rounded-lg shadow-xl bg-white 
                                                    
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



                </div>}
        </div>
    )
}

export default Swipe






