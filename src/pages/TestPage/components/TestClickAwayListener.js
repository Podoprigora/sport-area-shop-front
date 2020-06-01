import React, { useState, useCallback } from 'react';
import Button from '@components/Button';
import ClickAwayListener from '@components/ClickAwayListener';
import Portal from '@components/Portal';

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
