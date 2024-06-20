"use client"
import { useMutation } from "@tanstack/react-query";
import { getNonce } from "./api"
import { ConnectButton } from '@rainbow-me/rainbowkit';
const vision = () => {
    const getNonceQuery = useMutation({
        mutationFn: () => {
            return getNonce();
        },
        onSuccess: (data) => {
        }
    })
    return (
        <div>
            <button onClick={() => getNonceQuery.mutate()}>
                getNonce
            </button>
            <ConnectButton/>
        </div>
    )
}
export default vision;