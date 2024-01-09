import { CheckCircledIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import toast from "react-hot-toast"

interface AcceptInviteButonProps {
    league_id: string,
    receiver_id: string
    invite_id: string
    onRefresh: () => void
}

const AcceptInviteButon = (props: AcceptInviteButonProps) => {

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
                invite_id: props.invite_id
            },),
        });
        if (response.ok) {
            // League created successfully
            toast.success("Successfully Joined League");
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
                <CheckCircledIcon className='w-6 h-6 text-green9 hover:text-green12' />
            </button>
        </>
    )
};

export default AcceptInviteButon;