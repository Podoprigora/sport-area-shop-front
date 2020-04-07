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

const TestDropdown = () => {
    const { referenceRef, popperRef, popperState, popperInstance } = usePopper({
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 2]
                }
            }
        ]
    });
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const handleMenuRef = useForkRef(popperRef, menuRef);

    const handleButtonClick = useEventCallback((ev) => {
        setOpen((state) => !state);
        referenceRef(buttonRef.current);
    });

    const handleModalClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleMenuKeyDown = useCallback((ev) => {
        if (ev.key === 'Tab') {
            ev.preventDefault();

            setOpen(false);
        }
    }, []);

    const handleMenuClick = useCallback((ev) => {
        setOpen(false);
    }, []);

    useEffect(() => {
        if (open && menuRef.current) {
            menuRef.current.focus();
        }
    }, [open, popperState]);

    return (
        <div>
            <Button
                primary
                ref={buttonRef}
                icon={open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                iconAlign="right"
                iconSize="medium"
                onClick={handleButtonClick}
            >
                Show menu
            </Button>

            <Modal open={open} backdrop={false} onClose={handleModalClose}>
                <div className="popper" ref={popperRef}>
                    <CSSTransition in={open && !!popperInstance} timeout={300} classNames="menu">
                        <div
                            role="presentation"
                            className="menu u-placement-bottom-start"
                            ref={menuRef}
                            tabIndex="-1"
                            style={{ visibility: popperInstance ? 'visible' : 'hidden' }}
                            onKeyDown={handleMenuKeyDown}
                            onClick={handleMenuClick}
                        >
                            <div role="button" className="menu__item">
                                Item 1
                            </div>
                            <div role="button" className="menu__item">
                                Item 2
                            </div>
                            <div role="button" className="menu__item">
                                Item 3
                            </div>
                            <div role="button" className="menu__item">
                                Item 4
                            </div>
                            <div role="button" className="menu__item">
                                Item 5
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </Modal>
        </div>
    );
};

export default TestDropdown;
