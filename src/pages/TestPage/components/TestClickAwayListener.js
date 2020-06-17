import React, { useState, useCallback } from 'react';
import Button from '@ui/Button';
import ClickAwayListener from '@ui/ClickAwayListener';
import Portal from '@ui/Portal';

const TestClickAwayListener = () => {
    const [open, setOpen] = useState(false);

    const handleClickAway = useCallback((ev) => {
        setOpen(false);
    }, []);

    const handleButtonClick = useCallback((ev) => {
        setOpen((prevState) => !prevState);
    }, []);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <Button centered onClick={handleButtonClick}>
                    Test
                </Button>
                {open && (
                    <Portal>
                        <div>Hidden content</div>
                    </Portal>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default TestClickAwayListener;
