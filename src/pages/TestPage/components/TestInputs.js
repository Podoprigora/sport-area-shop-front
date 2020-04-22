import React from 'react';
import Input from '@components/Input';
import Button from '@components/Button';
import IconButton from '@components/IconButton';
import CreatemodeEditIcon from '@svg-icons/material/CreatemodeEditIcon';
import PlusIcon from '@svg-icons/feather/PlusIcon';
import MenuIcon from '@svg-icons/material/MenuIcon';

const TestInputs = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input placeholder="Enter name" />
            <Button primary centered style={{ marginLeft: '1rem' }}>
                Open
            </Button>
        </div>
    );
};

export default TestInputs;
