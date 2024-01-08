'use client'
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon,EnvelopeClosedIcon } from '@radix-ui/react-icons';
import toast, { Toaster } from "react-hot-toast";
import { InboxButton } from './ViewInboxButton';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
interface InboxModalProps {
}

const InboxModal =  () => {

    const [loading,setLoading] = useState(false);


    async function fetchInvites() {
        setLoading(true); // Assuming you have a setLoading function to handle UI loading state
      
        try {
          const response = await fetch('/api/invite', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            const invites = await response.json();
            // Do something with the invites, e.g., set them in state or display them
            console.log(invites); // Replace this with your actual implementation
          } else if (response.status === 401) {
            toast.error("User not authenticated");
          } else {
            const { error } = await response.json();
            toast.error(error);
          }
        } catch (error) {
          console.error('Error fetching invites:', error);
          toast.error("Error fetching invites");
        } finally {
          setLoading(false);
        }
    }
      
    useEffect(() => {
        fetchInvites();
    },[])

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className=''>
                    <EnvelopeClosedIcon className='text-t-orange'/>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="bg-t-white data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-t-dark-blue m-0 text-[17px] font-medium">
                        Inbox
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        View Pending League Invitations
                    </Dialog.Description>
                    <div className="mt-[25px] flex justify-end">
                        
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default InboxModal;