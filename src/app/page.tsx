"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
//api Connector
import { loginUser, registerUser } from '../../apiConnector/apiConnector';

type formDataType={
  email: string;
  password: string;
  username: string;
}

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: '',
    username: ''
  });

  const handleChange = (e:any) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await loginUser(formData.email, formData.password);
    if (result.accessToken) {
      Cookies.set('accessToken', result.accessToken);
      router.replace('/index');
    } else {
      console.log("Login failed, result:", result);
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await registerUser(formData.username, formData.email, formData.password);
    if(result){
      console.log("Register success:", result);
    }
    console.log("Register result:", result);
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">My Contact Book</h1>
     
      {login ? (
         <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch',display: 'flex', flexDirection: 'column'} }}
          noValidate
          autoComplete="off"
        >      
          <label className="font-bold">Login</label>
          <TextField id="email" label="Email" variant="outlined" value={formData.email}  onChange={handleChange}/>
          <TextField id="password" label="Password" variant="outlined" value={formData.password}  onChange={handleChange}/>
          <button className='bg-blue-600 rounded-md px-3 text-amber-50' 
          onClick={(e) => {
            e.preventDefault(); // Prevents reload
            handleLogin(e);
          }}>Login</button>
       </Box>
      ):(
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch',display: 'flex', flexDirection: 'column'} }}
          noValidate
          autoComplete="off"
        >      
          <label className="font-bold">Register</label>
          <TextField id="username" label="Username" variant="outlined" value={formData.username}  onChange={handleChange}/>
          <TextField id="email" label="Email" variant="outlined" value={formData.email}  onChange={handleChange}/>
          <TextField id="password" label="Password" variant="outlined" value={formData.password}  onChange={handleChange}/>
          <button className='bg-blue-600 rounded-md px-3 text-amber-50'
          onClick={(e) => {
            e.preventDefault(); // Prevents reload
            handleRegister(e);
          }}>Register</button>
        </Box>
      )}

      <div className='justify-items-center w-full '>
      <p>{login ? (
              "Don't have an account? register "
              ):(
                "Have an account? login "
                )} 
                <button className='bg-blue-600 rounded-md px-3 text-amber-50' onClick={()=>setLogin(!login)}>Here</button>
                </p>
      </div>
      
      </main>
    </div>
  );
}
