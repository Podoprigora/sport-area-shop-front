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
import Menu, { MenuItem } from '@components/Menu';
import Divider from '@components/Divider';
import ShoppingBasketIcon from '@svg-icons/material/ShoppingBasketIcon';
import UserIcon from '@svg-icons/feather/UserIcon';
import MapPinIcon from '@svg-icons/feather/MapPinIcon';
import TagIcon from '@svg-icons/feather/TagIcon';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import CreatemodeEditIcon from '@svg-icons/material/CreatemodeEditIcon';
import PlaylistAddIcon from '@svg-icons/material/PlaylistAddIcon';
import ViewListIcon from '@svg-icons/material/ViewListIcon';
import MenuIcon from '@svg-icons/material/MenuIcon';
import GridViewIcon from '@svg-icons/material/GridViewIcon';

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
    const [autoFocusMenuItem, setAutoFocusMenuItem] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    // const handleMenuRef = useForkRef(popperRef, menuRef);

    const handleButtonClick = useEventCallback((ev) => {
        setOpen(true);
        setAutoFocusMenuItem(false);
        // referenceRef(buttonRef.current);
    });

    const handleButtonKeyDown = useEventCallback((ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            setOpen(true);
            setAutoFocusMenuItem(true);
        }
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

    const handleMenuItem1Click = useCallback((ev) => {
        console.log('item 1 click');
    }, []);

    const handleMenuItem2Click = useCallback((ev) => {
        console.log('item 2 click');
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
                arrow
                icon={CreatemodeEditIcon}
                // iconSize="large"
                ref={buttonRef}
                aria-haspopup
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
            >
                Show menu
            </Button>

            <Menu
                open={open}
                autoWidth
                anchorRef={buttonRef}
                autoFocusItem={autoFocusMenuItem}
                onClose={handleMenuClose}
            >
                <MenuItem disabled icon={FavoriteOutlineIcon} onClick={handleMenuItem1Click}>
                    Item 1 Item 1 Item 1 Item 1 Item 1
                </MenuItem>
                <MenuItem icon={CreatemodeEditIcon} onClick={handleMenuItem2Click}>
                    Item 2
                </MenuItem>
                <Divider />
                <MenuItem icon={PlaylistAddIcon} onClick={handleMenuItem3Click}>
                    Item 3
                </MenuItem>
                <MenuItem disabled icon={ViewListIcon}>
                    Item 4
                </MenuItem>
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
