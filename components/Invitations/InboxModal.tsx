'use client'
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, EnvelopeClosedIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import toast, {  } from "react-hot-toast";
import AcceptInviteButon from './AcceptInviteButton';
import InviteActionButton from './AcceptInviteButton';

type InboxInvite = {
    id: string,
    league_id : string,
    receiver_id : string,
    league_name: string
    sender: string
    status: number
}

const InboxModal = () => {
    const [invites, setInvites] = useState<InboxInvite[]>([]);
    const [loading, setLoading] = useState(false);


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
                const data = await response.json();
                const invites = data.map((invite: any) => ({
                    id: invite.id,
                    receiver_id : invite.receiver.id,
                    league_id : invite.league.id,
                    league_name: invite.league.league_name,
                    sender: invite.sender.username,
                    status: invite.status
                }));

                setInvites(invites);
            } else if (response.status === 401) {
                toast.error("User not authenticated");
                setInvites([]);
            } else {
                const { error } = await response.json();
                toast.error(error);
                setInvites([]);
            }
        } catch (error) {
            console.error('Error fetching invites:', error);
            toast.error("Error fetching invites");
            setInvites([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInvites();
    }, [])

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className=''>
                    <EnvelopeClosedIcon className='text-t-orange' />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="bg-t-white data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-t-dark-blue m-0 text-[17px] font-medium">
                        Inbox
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        View Pending League Invitations
                    </Dialog.Description>
                    <div className="flex w-full justify-center">
                        <table className='min-w-full'>
                            <thead className="bg-t-grey dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="py-3 px-8 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        League Name
                                    </th>
                                    <th scope="col" className="py-3 px-8 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        From
                                    </th>
                                    <th scope="col" className="py-3 px-8 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Accept
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {invites.map((invite) => {
                                    return (
                                        (invite.status == 0) && (
                                            <tr key={invite.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{invite.league_name}.</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{invite.sender}</td>
                                            <td>
                                                <div className='flex px-10 space-x-10 justify-start'>
                                                    <InviteActionButton
                                                    receiver_id={invite.receiver_id}
                                                    league_id={invite.league_id}
                                                    invite_id={invite.id}
                                                    is_accept={true}
                                                    onRefresh={fetchInvites}
                                                    />
                                                    <InviteActionButton
                                                    receiver_id={invite.receiver_id}
                                                    league_id={invite.league_id}
                                                    invite_id={invite.id}
                                                    is_accept={false}
                                                    onRefresh={fetchInvites}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                })}
                            </tbody>
                        </table>
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