import React from "react";

interface HeaderProps {
    title: string,
}

const Header: React.FC<HeaderProps> = (props) => {

    return (
        <label title={props.title}>

        </label>
    );
}

export default Header;
