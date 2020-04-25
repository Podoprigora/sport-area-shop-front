import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import useEventCallback from '@components/hooks/useEventCallback';
import useForkRef from '@components/hooks/useForkRef';
import Modal from '@components/Modal';
import { usePopper } from '@components/Popper';

const getNextIndex = (menuElement, prevIndex, offset = 1) => {
    const activeElement = document.activeElement;
    const menuElementItems = Array.from(menuElement.children) || [];
    let nextElement = null;

    if (activeElement === menuElement) {
        nextElement = offset > 0 ? menuElement.firstChild : menuElement.lastChild;
    } else if (offset > 0) {
        nextElement = activeElement.nextElementSibling || menuElement.firstChild;
    } else if (offset < 0) {
        nextElement = activeElement.previousElementSibling || menuElement.lastChild;
    }

    while (nextElement && nextElement !== activeElement) {
        if (
            nextElement.getAttribute('role') !== 'menuitem' ||
            nextElement.getAttribute('aria-disabled') === 'true'
        ) {
            nextElement =
                offset > 0 ? nextElement.nextElementSibling : nextElement.previousElementSibling;

            if (!nextElement && activeElement !== menuElement) {
                nextElement = offset > 0 ? menuElement.firstChild : menuElement.lastChild;
            }
        } else {
            break;
        }
    }

    return nextElement ? menuElementItems.indexOf(nextElement) : prevIndex;
};

const Menu = React.forwardRef(function Menu(props, ref) {
    const {
        open,
        anchorRef = { current: null },
        placement = 'bottom-start',
        children,
        autoFocusItem = false,
        autoWidth = false,
        width,
        className,
        style,
        onClose = () => {}
    } = props;

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
    const [menuStyle, setMenuStyle] = useState({ ...style, ...(width && { width }) });

    const menuRef = useRef(null);
    const handleMenuRef = useForkRef(menuRef, ref);

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

                setSelectedIndex((prevIndex) => {
                    return getNextIndex(menuRef.current, prevIndex, 1);
                });
                break;
            }
            case 'ArrowUp': {
                ev.preventDefault();

                setSelectedIndex((prevIndex) => {
                    return getNextIndex(menuRef.current, prevIndex, -1);
                });
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

    // Set Popper referenceRef
    useEffect(() => {
        if (anchorRef.current) {
            referenceRef(anchorRef.current);
        }
    }, [anchorRef, referenceRef]);

    // Toggling focus between menu and anchor element when menu is shown and hidden
    useEffect(() => {
        if (!menuRef.current) {
            return undefined;
        }

        if (open) {
            menuRef.current.focus();
        } else if (!open && anchorRef.current) {
            anchorRef.current.focus();
        }

        return undefined;
    }, [open, popperState, anchorRef]);

    // Set focus to first item
    useEffect(() => {
        if (autoFocusItem && open && menuRef.current) {
            setSelectedIndex((prevIndex) => {
                return getNextIndex(menuRef.current, defaultIndex, 1);
            });
        }
    }, [autoFocusItem, defaultIndex, open, popperState]);

    // Update menu width according to anchor element
    useEffect(() => {
        if (anchorRef.current && autoWidth) {
            const anchorWidth = anchorRef.current.clientWidth;

            setMenuStyle((prevStyle) => {
                return { ...prevStyle, width: anchorWidth };
            });
        }
    }, [anchorRef, autoWidth]);

    // Reset selectedIndex when menu is closed
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
                        className={classNames('menu u-focus-outline-0', className, {
                            [`u-placement-${currentPlacement}`]: currentPlacement
                        })}
                        ref={handleMenuRef}
                        tabIndex="-1"
                        style={menuStyle}
                        onKeyDown={handleMenuKeyDown}
                    >
                        {items}
                    </div>
                </CSSTransition>
            </div>
        </Modal>
    );
});

Menu.propTypes = {
    anchorRef: PropTypes.object,
    open: PropTypes.bool,
    placement: PropTypes.string,
    children: PropTypes.node,
    autoWidth: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object,
    autoFocusItem: PropTypes.bool,
    onClose: PropTypes.func
};

export default Menu;
