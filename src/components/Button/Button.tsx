import React from "react";
import { ButtonProps } from '../../models/ButtonProps';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({title, description, onHandleEvent}) => {

    return (
        <button onClick={onHandleEvent} className="button wa">
            {title}
            <span>{description}</span>
        </button>
    );
}

export default Button;
