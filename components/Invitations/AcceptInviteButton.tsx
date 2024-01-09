import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import toast from "react-hot-toast"

interface InviteActionButtonProps {
    league_id: string,
    receiver_id: string
    invite_id: string
    is_accept: boolean
    onRefresh: () => void
}

const InviteActionButton = (props: InviteActionButtonProps) => {

    const [loading, setLoading] = useState(false);

    async function accept() {
            const response = await fetch('/api/league/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiver_id: props.receiver_id,
                    league_id: props.league_id,
                    invite_id: props.invite_id,
                    is_accept: props.is_accept
                },),
            });
            if (response.ok) {
                // League created successfully
                if(props.is_accept){
                    toast.success("Successfully Joined League");
                }
                if(props.is_accept){
                    toast.success("Successfully Declined invite");
                }
                setLoading(false);
                props.onRefresh();
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to join league');
                setLoading(false);
            }
    }

    return (
        <>
            <button
                onClick={accept}
                disabled={loading}>
                {props.is_accept ?
                    (
                        <CheckCircledIcon className='w-6 h-6 text-green9 hover:text-green12' />) :
                    (
                        <CrossCircledIcon className='w-6 h-6 text-red10  hover:text-red12'/>
                    )
                }
            </button>
        </>
    )
};

export default InviteActionButton;