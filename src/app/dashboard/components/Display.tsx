import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { unparse } from 'papaparse';
import Papa from 'papaparse';
 
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie } from 'recharts';


interface DisplayProps {
  onStepChange: (step:number) => void;
  csvData: any;
}

const data01 = [
  { category: 'Group A', count: 400 },
  { category: 'Group B', count: 300 },
  { category: 'Group C', count: 300 },
  { category: 'Group D', count: 200 },
];

const chartConfig = {
 mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const Display: React.FC<DisplayProps> = ({ onStepChange, csvData }) => {


const [chartData, setChartData] = useState(data01);

  const downloadCSV = () => {
    let output = Papa.unparse(csvData);
    console.log(output);

    // Create a Blob from the CSV string
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('downloadLink');
    if (downloadLink) {
      downloadLink.setAttribute('href', url);
      downloadLink.setAttribute('download', 'categorised.csv');
      // Trigger a click event on the download link
      downloadLink.click();
    }

  }

  const pieGeneration = () => {
    let count: { [key: string]: number } = {};
    
    for (let row of csvData) {
      if (row?.category in count) {
        count[row?.category] += 1;
      } else {
        count[row?.category] = 1;
      }
    }
  
    console.log(count);
  
    let formatted = [];
    
    for (let [category, countValue] of Object.entries(count)) {
      formatted.push({ category, count: countValue });
    }
  
    setChartData(formatted);
  };

  useEffect(()=>{
    pieGeneration();
  }, []);


  return (
    <div className='my-15 border-white border-2 border-solid p-10 rounded-lg bg-white'>
      <h1 className='font-bold text-xl my-10'>Display interface</h1>
      
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <PieChart width={730} height={250}>
  <Pie data={chartData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={50} fill="red" label />
</PieChart>
    </ChartContainer>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Transaction Date</TableHead>
            <TableHead>Debit</TableHead>
            <TableHead>Credit</TableHead>
            <TableHead >Description</TableHead>
            <TableHead>Assigned Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {csvData && csvData.map((row: any, index:any) =>
          (
            <TableRow key={index}>
              <TableCell className="font-medium">{row[""]}</TableCell>
              <TableCell>{row["_1"]}</TableCell>
              <TableCell>{row["_2"]}</TableCell>
              <TableCell >{row["_3"]}</TableCell>
              <TableCell >{row["category"]}</TableCell>
            </TableRow>
          ))
          }

        </TableBody>
      </Table>
 

      <Button onClick={() => downloadCSV()}>Download updated CSV</Button>
      <a id="downloadLink"></a>

    </div>
  )
}

export default Display