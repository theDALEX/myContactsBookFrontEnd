"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

type formDataType={
    id: string;
    name: string;
    email: string;
    phone: string;
  }

export default function GetContactById() {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');

  const [formData, setFormData] = useState<formDataType>({
      id: '',
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

  const updateContact = async (e: any) =>{
    e.preventDefault();
    if(!formData.id || !formData.name || !formData.email || !formData.phone){
        alert('Please fill all the fields');
        return;
    }
    try{
      const response = await fetch(`https://mycontactsservercode.onrender.com/api/contacts/${formData.id}`,{
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        })
        });
        const data = await response.json();
        if(response.status === 200){
          alert("Contact updated successfully");
          router.push('/index');
        } else{
          alert("Contact update failed, please try again");
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
        <h1 className="text-3xl font-bold">Search by ID to get Contacts</h1>
            
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch',display: 'flex', flexDirection: 'column'} }}
          noValidate
          autoComplete="off"
        >
            <label>Please enter the user id you want to update</label>
          <TextField id="id" label="id" variant="outlined" value={formData.id} onChange={handleChange}/>

          <label>Enter new Data</label>
          <TextField id="name" label="name" variant="outlined" value={formData.name} onChange={handleChange}/>
          <TextField id="email" label="email" variant="outlined" value={formData.email} onChange={handleChange}/>
          <TextField id="phone" label="phone" variant="outlined" value={formData.phone} onChange={handleChange}/>
          <button className='bg-blue-600 rounded-md px-3 text-amber-50' 
          onClick={(e)=>updateContact(e)}
        >Update</button>
       </Box>

   

      </main>
    </div>
  );
}
