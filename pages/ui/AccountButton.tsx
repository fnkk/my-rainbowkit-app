'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface propType {
    account?: string;
    balance?: string | undefined;
}
const AccountButton = ({ account, balance }: propType) => {
    const search = useSearchParams()
    const registerCode = search.get('R')
    const { disconnect } = useDisconnect();
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter()
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleDisconnect = () => {
        disconnect();
    };
    return (
        <div className={` px-4 py-2 flex flex-row gap-3 items-center relative cursor-pointer text-white`}
            style={{ border: '1px solid #35354B', borderRadius: '37px' }}
            tabIndex={0} // 这是重要的，使div可以被聚焦
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <div>
                {account ? account : ""}
            </div>
            {isFocused &&
                <div className='absolute top-12 flex flex-col p-2 justify-between w-48 bg-custon-bg-100 rounded-xl right-0 z-10'>
                    <div className='px-2 py-1 cursor-pointer text-white hover:bg-custon-bg-200'
                        onClick={
                            () => {
                                router.push(('/vision/MyAccount'))
                                setIsFocused(false)
                            }
                        }
                    >My Account</div>
                    <div className='px-2 py-1 hover:bg-custon-bg-200 text-white cursor-pointer' onClick={handleDisconnect}>Logout</div>
                </div>
            }
        </div>
    )
}
export default AccountButton;