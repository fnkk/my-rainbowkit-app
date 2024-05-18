"use client"
import Image from "next/image";
import { useState } from "react";
interface PropType {
    children: React.ReactNode
    buttonProp?: any
    onClick?: () => void
}

const VisionButton = ({ children, buttonProp, onClick }: PropType) => {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <button className={'font-costom flex gap-3 justify-center items-center bg-white text-black h-[42px]'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={onClick} {...buttonProp} style={{ width: '167px', borderRadius: '37px' }}>
            {children}
        </button>
    );
};

export default VisionButton;
