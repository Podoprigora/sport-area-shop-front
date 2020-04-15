import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import useEventCallback from '@components/hooks/useEventCallback';
import Modal from '@components/Modal';
import { usePopper } from '@components/Popper';

const getMenuIndexOffset = (menuElement, step = 1) => {
    const activeElement = document.activeElement;
    let nextElement = null;

    if (activeElement === menuElement) {
        nextElement = step > 0 ? menuElement.firstChild : menuElement.lastChild;
    } else {
        nextElement =
            step > 0 ? activeElement.nextElementSibling : activeElement.previousElementSibling;
    }

    let offset = step;

    if (nextElement) {
        while (nextElement) {
            if (
                nextElement.getAttribute('role') !== 'menuitem' ||
                nextElement.getAttribute('aria-disabled') === 'true'
            ) {
                nextElement =
                    step > 0 ? nextElement.nextElementSibling : nextElement.previousElementSibling;

                offset += step;
            } else {
                break;
            }
        }
    }

    console.log(nextElement, offset);

    return nextElement ? offset : false;
};

const Menu = (props) => {
    const { open, anchorRef, placement = 'bottom-start', children, onClose = () => {} } = props;
    const defaultIndex = -1;

    const { referenceRef, popperRef, popperState, popperInstance } = usePopper({
        placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 2]
                }
            }
        ]
    });
    const [exited, setExited] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
    const menuRef = useRef(null);

    const itemsLength = React.Children.toArray(children).length;

    // Handlers

    const handleModalClose = useEventCallback((ev) => {
        onClose();
    });

    const handleMenuKeyDown = useEventCallback((ev) => {
        switch (ev.key) {
            case 'Tab':
                ev.preventDefault();

                onClose();
                break;
            case 'ArrowDown': {
                ev.preventDefault();
                const offset = getMenuIndexOffset(menuRef.current, 1);

                if (offset) {
                    setSelectedIndex((prevIndex) => {
                        return prevIndex + offset;
                    });
                }
                break;
            }
            case 'ArrowUp': {
                ev.preventDefault();
                const offset = getMenuIndexOffset(menuRef.current, -1);

                if (offset) {
                    setSelectedIndex((prevIndex) => {
                        return prevIndex + offset;
                    });
                }
                break;
            }
            default:
                break;
        }
    });

    const handleItemClick = useCallback(
        (child, index) => (ev) => {
            setSelectedIndex(index);
            onClose();

            if (child.props.onClick) {
                child.props.onClick(ev);
            }
        },
        [onClose]
    );

    const handleTransitionEnter = useCallback(() => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback(() => {
        setExited(true);
    }, []);

    // Effects

    useEffect(() => {
        if (anchorRef.current) {
            referenceRef(anchorRef.current);
        }
    }, [anchorRef, referenceRef]);

    useEffect(() => {
        if (open && menuRef.current) {
            menuRef.current.focus();
        } else if (!open && anchorRef.current) {
            anchorRef.current.focus();
        }
    }, [open, popperState, anchorRef]);

    useEffect(() => {
        return () => {
            if (!open) {
                setSelectedIndex(defaultIndex);
            }
        };
    }, [open, defaultIndex]);

    // Render

    const currentPlacement = popperState.placement || placement;

    const items = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
            selected: index === selectedIndex,
            onClick: handleItemClick(child, index)
        });
    });

    return (
        <Modal open={open || !exited} backdrop={false} onClose={handleModalClose}>
            <div className="popper" ref={popperRef}>
                <CSSTransition
                    in={open && !!popperInstance}
                    timeout={300}
                    classNames="menu"
                    onEnter={handleTransitionEnter}
                    onExited={handleTransitionExited}
                >
                    <div
                        role="menu"
                        className={classNames('menu u-focus-outline-0', {
                            [`u-placement-${currentPlacement}`]: currentPlacement
                        })}
                        ref={menuRef}
                        tabIndex="-1"
                        onKeyDown={handleMenuKeyDown}
                    >
                        {items}
                    </div>
                </CSSTransition>
            </div>
        </Modal>
    );
};

Menu.propTypes = {
    anchorRef: PropTypes.object,
    open: PropTypes.bool,
    placement: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func
};

export default Menu;
