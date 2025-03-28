import React from 'react';

const SelectButton = ({ children, selected, onClick }) => {
    const buttonStyles = {
        border: '1px solid gold',
        borderRadius: '5px',
        padding: '10px 20px',
        fontFamily: 'Montserrat',
        cursor: 'pointer',
        backgroundColor: selected ? 'gold' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 700 : 500,
        textAlign: 'center',
        width: '22%'
    };
    return (
        <span style={buttonStyles} onClick={onClick}>
            {children}
        </span>
    );
};

export default SelectButton;
