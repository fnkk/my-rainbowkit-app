'use client'
import VisionButton from "./VisionButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from 'wagmi';
import AccountButton from "./AccountButton";
import { useAccount } from "wagmi";
const VisionConnectButton = () => {
    const { disconnect } = useDisconnect();
    const { isConnected } = useAccount()
    const handleDisconnect = () => {
        disconnect();
    };

    return (
        <ConnectButton.Custom>
            {
                ({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated') &&
                        isConnected

                    console.log("connected:", connected, "ready:", ready, "account:", account)
                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <VisionButton onClick={openConnectModal}>
                                            <div className="font-medium text-sm">
                                                Connect Wallet
                                            </div>
                                        </VisionButton>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <VisionButton onClick={openChainModal}>
                                            Wrong network
                                        </VisionButton>
                                    );
                                }

                                return (
                                    <AccountButton account={account.displayName} balance={account.displayBalance} />
                                );
                            })()}
                        </div>
                    );
                }
            }
        </ConnectButton.Custom>
    )
}
export default VisionConnectButton