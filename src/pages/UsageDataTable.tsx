"use client"

import React, { useEffect, useState } from 'react';


import { Payment, columns } from "./columns-payment"
import { DataTable } from "./data-table"




 async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "123m@example.com",
    },
    // ...
    
    
    
  ]
}

const DemoPage: React.FC = () => {
  const [data, setData] = useState<Payment[]>([]);  // initialize as [] instead of null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DemoPage;
