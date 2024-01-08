'use client';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import toast,{Toaster} from "react-hot-toast";

interface AddUserFormModalProps {
  league_id : string,
}

const AddUserFormModal = ({league_id} : AddUserFormModalProps) => {

  const [username,setUsername] = useState("username");
  const [loading,setLoading] = useState(false);

  async function handleSubmit(){
      fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiver_username : username,
          league_id : league_id
        },),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 200) {
          toast.success("User Invited!");
          Dialog.DialogClose;
        } else {
          const { error } = await res.json();
          toast.error(error);
        }
      });
    }

  return(
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="text-t-dark-blue shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black outline outline-t-dark-blue">
        Add User
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="bg-t-white data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-t-dark-blue m-0 text-[17px] font-medium">
          Add User
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Invite user by username
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-t-dark-blue w-[90px] text-right text-[15px]" htmlFor="name">
            Username
          </label>
          <input
            className="text-t-dark-blue shadow-t-dark-blue focus:shadow-t-light-blue inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
          />
        </fieldset>
        <Toaster />
        <div className="mt-[25px] flex justify-end">
          <button 
            className="bg-t-light-blue text-t-orange hover:bg-t-dark-blue inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            onClick={handleSubmit}>
              Send Invite
          </button>
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
};

export default AddUserFormModal;