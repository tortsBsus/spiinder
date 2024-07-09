import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CategoriesProps {
  updateCategories: (categories: string[]) => void;
  onStepChange: (step:number) => void;
}

const Categories : React.FC<CategoriesProps> = ({updateCategories, onStepChange}) => {
  
  const [category1, setCategory1] = useState('Food');
  const [category2, setCategory2] = useState('Transport');
  

  const handleCategory1Change = (e:React.ChangeEvent<HTMLInputElement>) => setCategory1(e.target.value);
  const handleCategory2Change = (e:React.ChangeEvent<HTMLInputElement>) => setCategory2(e.target.value);
  

  const nextStep = () => {
    updateCategories([category1,category2]);
    onStepChange(3);
  }

    return (
    <div className=' w-full border-white border-2 border-solid p-10 rounded-lg bg-white flex flex-col'>
        <div className=' my-10'>
        <h2 className='font-bold text-xl'>Define your Categories</h2>
        </div>
            <div className='flex flex-col'>
            <div className='flex flex-col md:flex-row mt-5 items-baseline '>
                <h3 className='mx-2 w-contain font-semibold text-nowrap'>Category 1</h3> 
                <Input className='mx-2' value={category1} onChange={handleCategory1Change} />
            </div>
            
            <div className='flex flex-col md:flex-row mt-5 items-baseline'>
                <h3 className='mx-2 w-contain font-semibold text-nowrap'>Category 2</h3>
                <Input className='mx-2' value={category2} onChange={handleCategory2Change} />
            </div>
          
            </div>    
            <div className='my-16'>
                <h3> Your Categories are : {`${category1}, ${category2}`} </h3>
            </div>
          <Button className='w-full my-5' onClick={() => nextStep()}> Move to the next step </Button>   
    </div>
  )
}

export default Categories