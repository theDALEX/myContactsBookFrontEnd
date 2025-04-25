"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

export default function GetContactById() {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');
const [id, setId] = useState<string>('');

    const [contact, setContact] = useState<any>(null);

  const searchByID = async (e: any) =>{
    e.preventDefault();
    if(!id){
        alert('Please fill the id field');
        return;
    }
    try{
      const response = await fetch(`https://mycontactsservercode.onrender.com/api/contacts/${id}`,{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        });
        const data = await response.json();
        setContact(data);
        console.log(data) ;
    } catch (error){
      console.error(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={()=>router.back()} className='bg-black text-amber-50 px-2'>Back</button>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Search by ID to get Contacts</h1>
            
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch',display: 'flex', flexDirection: 'column'} }}
          noValidate
          autoComplete="off"
        >
            <label>Please enter the user id</label>
          <TextField id="id" label="id" variant="outlined" value={id} onChange={(event) => { setId(event.target.value); }} />
          <button className='bg-blue-600 rounded-md px-3 text-amber-50' 
          onClick={(e)=>searchByID(e)}
        >Search</button>
       </Box>

       {contact && (
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold text-gray-700'>Contact Details</h1>
                <h1 className='text-2xl font-bold'>{contact.name}</h1>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
            </div>
       )}

      </main>
    </div>
  );
}
