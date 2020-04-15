import React, { useState, useCallback, useRef, useEffect } from 'react';
import Button from '@components/Button';
import Popper, { usePopper } from '@components/Popper';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';
import Modal from '@components/Modal';
import Portal from '@components/Portal';
import useForkRef from '@components/hooks/useForkRef';
import { CSSTransition } from 'react-transition-group';
import { reference } from '@popperjs/core';
import useEventCallback from '@components/hooks/useEventCallback';
import Menu, { MenuItem, MenuDivider } from '@components/Menu';

const TestDropdown = () => {
    // const { referenceRef, popperRef, popperState, popperInstance } = usePopper({
    //     placement: 'bottom-start',
    //     modifiers: [
    //         {
    //             name: 'offset',
    //             options: {
    //                 offset: [0, 2]
    //             }
    //         }
    //     ]
    // });
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    // const handleMenuRef = useForkRef(popperRef, menuRef);

    const handleButtonClick = useEventCallback((ev) => {
        setOpen(true);
        // referenceRef(buttonRef.current);
    });

    const handleMenuClose = useCallback(() => {
        setOpen(false);
    }, []);

    // const handleMenuKeyDown = useCallback((ev) => {
    //     if (ev.key === 'Tab') {
    //         ev.preventDefault();

    //         setOpen(false);
    //     }
    // }, []);

    const handleMenuClick = useCallback((ev) => {
        setOpen(false);
    }, []);

    const handleMenuItem3Click = useCallback((ev) => {
        console.log('item 3 click');
    }, []);

    //
    // useEffect(() => {
    //     if (open && menuRef.current) {
    //         menuRef.current.focus();
    //     }
    // }, [open, popperState]);

    return (
        <div>
            <Button
                primary
                ref={buttonRef}
                icon={KeyboardArrowDownIcon}
                iconAlign="right"
                iconSize="medium"
                aria-haspopup
                onClick={handleButtonClick}
            >
                Show menu
            </Button>

            <Menu open={open} anchorRef={buttonRef} onClose={handleMenuClose}>
                <MenuItem disabled>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleMenuItem3Click}>Item 3</MenuItem>
                <MenuItem disabled>Item 4</MenuItem>
            </Menu>

            {/* <Modal open={open} backdrop={false} onClose={handleMenuClose}>
                <div className="popper" ref={popperRef}>
                    <CSSTransition
                        in={open && !!popperInstance}
                        timeout={300}
                        classNames="menu"
                        appear
                    >
                        <ul
                            role="menu"
                            className="menu u-placement-bottom-start u-focus-outline-0"
                            ref={handleMenuRef}
                            tabIndex="-1"
                            onKeyDown={handleMenuKeyDown}
                            onClick={handleMenuClick}
                        >
                            <li role="menuitem" className="menu__item">
                                Item 1
                            </li>
                            <li role="menuitem" className="menu__item">
                                Item 2
                            </li>
                            <li role="menuitem" className="menu__item">
                                Item 3
                            </li>
                        </ul>
                    </CSSTransition>
                </div>
            </Modal> */}
        </div>
    );
};

export default TestDropdown;
