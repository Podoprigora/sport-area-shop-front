import React, { useRef, useEffect } from 'react';
import Input from '@ui/Input';
import Button from '@ui/Button';
import IconButton from '@ui/IconButton';
import CreatemodeEditIcon from '@ui/svg-icons/material/CreatemodeEditIcon';
import PlusIcon from '@ui/svg-icons/feather/PlusIcon';
import MenuIcon from '@ui/svg-icons/material/MenuIcon';
import FavoriteOutlineIcon from '@ui/svg-icons/material/FavoriteOutlineIcon';

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
