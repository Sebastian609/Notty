import React from 'react';

interface ButtonProps {
    text: string;
    w: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, w }) => {
    return (
        <div>
            <button className={ `bg-green-500 w-${w} text-white p-2 rounded-lg    hover: hover:bg-green-400 duration-300`}>{text}</button>
        </div>
    );
}

export default PrimaryButton;
