"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

type formDataType={
  name: string;
  email: string;
  phone: string;
}

export default function Index() {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');

  const [formData, setFormData] = useState<formDataType>({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: any)=>{
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const createContact = async (e: any) =>{
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.phone){
      alert('Please fill all the fields');
      return;
    }
    try{
      const response = await fetch('https://mycontactsservercode.onrender.com/api/contacts',{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }),
        });
        const data = await response.json();
        if(response.status === 200){
          alert("Contact created successfully");
          router.push('/index');
        } else{
          alert("Contact creation failed, please try again");
        }
        console.log(data) ;
    } catch (error){
      console.error(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={()=>router.back()} className='bg-black text-amber-50 px-2'>Back</button>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Create A New Contact</h1>
            
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch',display: 'flex', flexDirection: 'column'} }}
          noValidate
          autoComplete="off"
        >
          <TextField id="name" label="Name" variant="outlined" value={formData.name} onChange={handleChange}/>
          <TextField id="email" label="Email" variant="outlined" value={formData.email} onChange={handleChange}/>
          <TextField id="phone" label="phone" variant="outlined" value={formData.phone} onChange={handleChange}/>
          <button className='bg-blue-600 rounded-md px-3 text-amber-50' 
          onClick={(e)=>createContact(e)}
        >Create</button>
       </Box>

      </main>
    </div>
  );
}
