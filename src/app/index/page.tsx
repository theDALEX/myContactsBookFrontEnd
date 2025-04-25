"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect  } from 'react';
import Cookies from 'js-cookie';


export default function Index() {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');

  const [allContacts, setAllContacts] = useState<[]>([]);

  useEffect(() => {
    const fetchAllContacts = async()=>{
        try{
            const response = await fetch('https://mycontactsservercode.onrender.com/api/contacts',{
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                  },
            });
            const data = await response.json();
            setTimeout(()=>{

              setAllContacts(data);
            },100)
            console.log(data) ;
        } catch (error) {
            console.error(error);
        }
    };

    fetchAllContacts();
  }, [accessToken]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-extrabold">My Contact Book</h1>
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">

        <div className='flex flex-col gap-5'>
            <button onClick={()=>router.push('/contacts/createContact')} id='contactOptionsButton'>Create New Contact</button>
            <button onClick={()=>router.push('/contacts/getContactById')} id='contactOptionsButton'>Get Contact By ID</button>
            <button onClick={()=>router.push('/contacts/updateContact')} id='contactOptionsButton'>Update Contact</button>
            <button onClick={()=>router.push('/contacts/deleteContact')} id='contactOptionsButton'>Delete Contact</button>
        </div>

        
        {allContacts.length > 0 && (
          <div>
            <h1 className='text-3xl font-bold text-gray-700'>All Your Contacts</h1>
          <ul className='flex flex-col gap-5'>
            {allContacts.map((contact:any, index:number) => (
              <li key={index} className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>{contact.name}</h1>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
                <p>{contact._id}</p>
              </li>
            ))}
          </ul> 
          
        </div>
      )}

      </main>
    </div>
  );
}
