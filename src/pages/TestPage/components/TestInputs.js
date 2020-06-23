import React, { useRef, useEffect } from 'react';
import Input from '@ui/Input';
import Button from '@ui/Button';
import IconButton from '@ui/IconButton';
import CreatemodeEditIcon from '@svg-icons/material/CreatemodeEditIcon';
import PlusIcon from '@svg-icons/feather/PlusIcon';
import MenuIcon from '@svg-icons/material/MenuIcon';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';

const TestInputs = () => {
    const inputRef = useRef(null);

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //     }
    // }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input ref={inputRef} name="test" placeholder="Enter name" />
            <Button primary centered style={{ marginLeft: '1rem' }}>
                Open
            </Button>
            <IconButton size="medium">
                <FavoriteOutlineIcon />
            </IconButton>
        </div>
    );
};

export default TestInputs;
