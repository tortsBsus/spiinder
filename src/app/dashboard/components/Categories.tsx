import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CategoriesProps {
  updateCategories: (categories: string[]) => void;
  onStepChange: (step:number) => void;
}

const Categories : React.FC<CategoriesProps> = ({updateCategories, onStepChange}) => {
  
  const [category1, setCategory1] = useState('Category 1');
  const [category2, setCategory2] = useState('Category 2');
  const [category3, setCategory3] = useState('Category 3');

  const handleCategory1Change = (e:React.ChangeEvent<HTMLInputElement>) => setCategory1(e.target.value);
  const handleCategory2Change = (e:React.ChangeEvent<HTMLInputElement>) => setCategory2(e.target.value);
  const handleCategory3Change = (e:React.ChangeEvent<HTMLInputElement>) => setCategory3(e.target.value);

  const nextStep = () => {
    updateCategories([category1,category2,category3]);
    onStepChange(3);
  }

    return (
    <div className=' w-1/2 border-white border-2 border-solid p-10 rounded-lg bg-white'>
        <div className=' my-10'>
        <h1 className='font-bold text-xl'>Categories interface</h1>
        <h2>Set what each category is</h2>
        </div>
            <div className='flex flex-col'>
            <div className='flex flex-row'>
                <h3 className='mx-2 w-contain'>Category 1</h3> 
                <Input className='mx-2' value={category1} onChange={handleCategory1Change} />
            </div>
            
            <div className='flex flex-row'>
                <h3 className='mx-2'>Category 2</h3>
                <Input className='mx-2' value={category2} onChange={handleCategory2Change} />
            </div>
            <div className='flex flex-row'>
                <h3 className='mx-2'>Category 3</h3> 
                <Input className='mx-2' value={category3} onChange={handleCategory3Change} />
            </div>
            </div>    
            <div className='my-5'>
                <h3> Your Categories are :{`${category1}, ${category2}, ${category3}`} </h3>
            </div>
          <Button className='w-full my-5' onClick={() => nextStep()}> Move to the next step </Button>   
    </div>
  )
}

export default Categories