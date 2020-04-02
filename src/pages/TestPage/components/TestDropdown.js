import React, { useState, useCallback, useRef, useEffect } from 'react';
import Button from '@components/Button';
import Popper from '@components/Popper';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';

const TestDropdown = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleButtonClick = useCallback((ev) => {
        setOpen((state) => !state);
    }, []);

    return (
        <div>
            <Button
                primary
                ref={anchorRef}
                icon={open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                iconAlign="right"
                iconSize="medium"
                onClick={handleButtonClick}
            >
                Show menu
            </Button>

            <Popper open={open} anchorRef={anchorRef} placement="bottom-start">
                {({ placement }) => (
                    <div className="menu">
                        <div role="button" className="menu__item">
                            Item 1
                        </div>
                        <div role="button" className="menu__item">
                            Item 2
                        </div>
                        <div role="button" className="menu__item">
                            Item 3
                        </div>
                        {/* <div role="button" className="menu__item">
                            Item 4
                        </div>
                        <div role="button" className="menu__item">
                            Item 5
                        </div> */}
                    </div>
                )}
            </Popper>
        </div>
    );
};

export default TestDropdown;
