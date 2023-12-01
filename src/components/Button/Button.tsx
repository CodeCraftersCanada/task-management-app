import React from "react";
import './Button.scss';

interface ButtonProps {
    title: string,
    description: string,
    onHandleEvent: () => void,
}

const Button: React.FC<ButtonProps> = ({title, description, onHandleEvent}) => {

    return (
        <button onClick={onHandleEvent} className="button wa">
            {title}
            <span>{description}</span>
        </button>
    );
}

export default Button;
