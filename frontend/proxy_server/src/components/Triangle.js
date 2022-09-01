import React, { useState, useEffect } from 'react';
import { Button } from "@chakra-ui/react";

export const TriangleUp = () => {
    // const [count, setCount] = useState(0);


    
    // const onIncrement = () => {
        // let number = count + 1;
        // setCount(("0" + number).slice(-2));
    // };

    return (
        <button
            style={{
                width: '0',
                height: '0',
                borderStyle: 'solid',
                borderWidth: '0 11px 20px 11px',
                borderColor: 'transparent transparent #5E5E5F transparent',
                borderRadius: '3px',
                marginTop: '30px',
                marginBottom: '10px',
                marginRight: '48px',
                marginLeft: '48px',
            }}
            // onClick={onIncrement}
        ></button>
    )
}

export const TriangleDown = () => {
    // const [count, setCount] = useState(0);
    
    // const onDecrement = () => {
        // setCount(count - 1);
    // };

    return (
        <button
            style={{
                width: '0',
                height: '0',
                borderStyle: 'solid',
                borderWidth: '20px 11px 0 11px',
                borderColor: '#5E5E5F transparent transparent transparent',
                borderRadius: '3px',
                marginTop: '10px',
                marginBottom: '40px',
                marginRight: '48px',
                marginLeft: '48px',
            }}
            // onClick={onDecrement}
        ></button>
    )
}
