'use server';
import prisma from "../prisma";

interface CreateInvitationProps {
    senderId: string;
    receiverUsername: string;
}

export async function sendInvite(props : CreateInvitationProps){
    try {
        const invitation = await prisma.invitation.create({
          data: {
            sender: { connect: { id: props.senderId } },
            receiver: { connect: { username: props.receiverUsername } },
            // Set other fields as needed, for example:
            accepted: false,
          },
        });
    
        return invitation;
      } catch (error) {
        console.error('Error creating invitation:', error);
        throw error; // Re-throw the error to handle it in the calling code if necessary
      }
}