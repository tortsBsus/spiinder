import React, { useEffect, useState } from 'react';
import { TrendingUp } from "lucide-react"
import { Label } from "recharts"
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

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie } from 'recharts';


interface DisplayProps {
  onStepChange: (step: number) => void;
  csvData: any;
}

const data01 = [
  { category: 'Group A', count: 400, amount:0, fill: "var(--)" },
  { category: 'Group B', count: 300, amount:0, fill: "var(--)" },
  { category: 'Group C', count: 300, amount:0, fill: "var(--)" },
  { category: 'Group D', count: 200, amount:0, fill: "var(--)" },
];

const chartConfigEx = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig

const Display: React.FC<DisplayProps> = ({ onStepChange, csvData }) => {


  const [chartData, setChartData] = useState(data01);
  const [chartConfig, setChartConfig] = useState(chartConfigEx);

  const [tableView, setTableView] = useState<boolean>(false);
  const showTableView = () => {
    setTableView(!tableView);
  }

  const [pieChartView, setPieChartView] = useState<boolean>(false);

  const showPieChartView = () => {
    setPieChartView(!pieChartView);
  }



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
    let count: { [key: string]: {counter:number, amount:number} } = {};
    
    for (let row of csvData) {
      let creditAmt = row["_2"]?.trim() || "";
      let debitAmt = row["_1"]?.trim() || "";
      let Amount = creditAmt.length != 0 ? parseFloat(creditAmt) : parseFloat(debitAmt); 

      if (row?.category in count) {
          count[row.category].counter += 1;
          count[row.category].amount += Amount;

      } else {
          count[row.category] = { counter: 1, amount: Amount };
          
      }
  }



    let formatted = [];
    let colorNo = 1;

    for (let [category, countValue] of Object.entries(count)) {
      formatted.push({ category, count: countValue.counter,amount:countValue.amount, fill: "hsl(var(--chart-" + colorNo + "))" });
      if (colorNo < 6) colorNo++;
    }
    console.log("formatted:",formatted);
    setChartData(formatted);
    let tempChartConfig: any = {};
    for (let x of formatted) {
      tempChartConfig[x.category] = { "label": x.category };
    }

    console.log(tempChartConfig);
    setChartConfig((tempChartConfig));



  };

  useEffect(() => {
    pieGeneration();
  }, []);


  return (
    <div className={`font-general my-15 w-full p-10 rounded-lg md:${(pieChartView || tableView) ? "flex-col" : "flex-row items-stretch"} flex flex-col  justify-center`}>
     
     
     
     
      {/*----------------------------------------------------------------------  Pie Chart View ---------------------------------------------------------------------- */}
      <div className='my-10 mx-2 py-10 px-8 grow bg-primary/90 border-2 border-solid border-secondary/20 rounded-lg flex flex-col justify-center content-center p-2'>
        <h1 className='font-bold text-xl '>Pie Chart</h1>
        <h2 className='font-gambetta'>View the distribution of your transactions</h2>
        {
          pieChartView ?
            <>
              <ChartContainer config={chartConfig} className="min-h-[200px] md:w-1/2 self-center">
                <PieChart width={730} height={250}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />


                  <Pie data={chartData}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    // outerRadius={50} 
                    outerRadius={60}
                    fill="red" label />

                       <Pie data={chartData}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    // outerRadius={50} 
                    innerRadius={70}
                    outerRadius={90}
                    fill="red" label />
                </PieChart>
              </ChartContainer>
              <Button variant="outline" className="w-full text-wrap bg-secondary/30  border border-solid border-secondary rounded-lg hover:bg-secondary/80 font-semibold " onClick={() => showPieChartView()}>Close Pie Chart</Button>
            </> :
            <>
              <Button variant="outline" className="mt-4 w-full text-wrap bg-secondary/30  border border-solid border-secondary rounded-lg hover:bg-secondary/80 font-semibold " onClick={() => showPieChartView()}>Generate Pie Chart</Button>
            </>
        }
      </div>


      {/*----------------------------------------------------------------------  Table View ---------------------------------------------------------------------- */}
      <div className='my-10 mx-2 py-10 px-8 grow bg-primary/90 border-2 border-solid border-secondary/20 rounded-lg flex flex-col justify-center content-center p-2'>


        <h1 className='font-bold text-xl'>Table view</h1>
        <h2 className='font-gambetta'>View your transactions with their assigned categories</h2>
        {
          tableView ? <>


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
                {csvData && csvData.map((row: any, index: any) =>
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
            <Button variant="outline" className="w-full text-wrap bg-secondary/30  border border-solid border-secondary rounded-lg hover:bg-secondary/80 font-semibold " onClick={() => showTableView()}>Close Table View</Button>
          </>
            :
            <Button variant="outline" className="mt-4 w-full  text-wrap bg-secondary/30  border border-solid border-secondary rounded-lg hover:bg-secondary/80 font-semibold " onClick={() => showTableView()}>Show Table View</Button>
        }

      </div>






      {/*----------------------------------------------------------------------  Download View ---------------------------------------------------------------------- */}
      <div className='my-10 mx-2 py-10 px-8 grow bg-primary/90 border-2 border-solid border-secondary/20 rounded-lg flex flex-col justify-center content-center p-2'>
        <h1 className='font-bold text-xl'>Download Updated CSV</h1>
        <h2 className='font-gambetta'>Save your categorised transactions! </h2>
        <Button className="mt-4 w-full text-wrap bg-secondary/30  border border-solid border-secondary rounded-lg hover:bg-secondary/80 font-semibold " onClick={() => downloadCSV()}>Download</Button>
        <a id="downloadLink"></a>
      </div>






    </div>
  )
}

export default Display







