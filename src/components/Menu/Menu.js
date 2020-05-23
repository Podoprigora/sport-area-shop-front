import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import useEventCallback from '@components/hooks/useEventCallback';
import useForkRef from '@components/hooks/useForkRef';
import useControlled from '@components/hooks/useControlled';
import Modal from '@components/Modal';
import { usePopper } from '@components/Popper';
import List from '@components/List';
import Scrollbar from '@components/Scrollbar';

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
            nextElement.getAttribute('role') !== 'button' ||
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

const defaultIndex = -1;

const getDefaultSelectedIndex = (children, defaultValue = defaultIndex) => {
    let selectedIndex = defaultValue;

    React.Children.forEach(children, (child, i) => {
        if (child.props.selected && !child.props.disabled) {
            selectedIndex = i;
        }
    });

    return selectedIndex;
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
        height,
        className,
        style,
        onClose = () => {},
        onSelect = () => {},
        onItemClick = () => {}
    } = props;

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

    const [selectedIndex, setSelectedIndex] = useControlled(
        getDefaultSelectedIndex(children, null),
        defaultIndex
    );
    const [menuStyle, setMenuStyle] = useState({
        ...style,
        ...(width && { width }),
        ...(height && { height })
    });

    const menuRef = useRef(null);
    const handleMenuRef = useForkRef(menuRef, ref);

    // Handlers

    const doSelect = useCallback(
        (index) => {
            setSelectedIndex(index);

            onSelect(index);
        },
        [setSelectedIndex, onSelect]
    );

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

                doSelect(getNextIndex(menuRef.current, selectedIndex, 1));
                break;
            }
            case 'ArrowUp': {
                ev.preventDefault();

                doSelect(getNextIndex(menuRef.current, selectedIndex, -1));
                break;
            }
            default:
                break;
        }
    });

    const handleItemClick = useCallback(
        (child, index) => (ev) => {
            doSelect(index);

            if (child.props.onClick) {
                child.props.onClick(ev);
            }

            onItemClick(ev, index);
        },
        [onItemClick, doSelect]
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

        if (open && selectedIndex === defaultIndex) {
            menuRef.current.focus();
        } else if (!open && anchorRef.current) {
            anchorRef.current.focus();
        }

        return undefined;
    }, [open, popperState, selectedIndex, anchorRef]);

    // Set focus to the first item
    useEffect(() => {
        if (open && menuRef.current) {
            setSelectedIndex((prevIndex) => {
                if (autoFocusItem && prevIndex === -1) {
                    return getNextIndex(menuRef.current, prevIndex, 1);
                }

                return prevIndex;
            });
        }
    }, [autoFocusItem, open, popperState, setSelectedIndex]);

    // Update menu width according to the anchor element
    useEffect(() => {
        if (anchorRef.current && autoWidth) {
            const anchorWidth = anchorRef.current.clientWidth;

            setMenuStyle((prevStyle) => {
                return { ...prevStyle, width: anchorWidth };
            });
        }
    }, [anchorRef, autoWidth]);

    // Reset selectedIndex when menu was closed
    useEffect(() => {
        return () => {
            if (!open && !!popperInstance) {
                setSelectedIndex(defaultIndex);
            }
        };
    }, [open, popperInstance, setSelectedIndex]);

    // Render

    const currentPlacement = popperState.placement || placement;

    const items = React.Children.map(children, (child, index) => {
        const selected = index === selectedIndex;

        return React.cloneElement(child, {
            selected,
            autoFocus: selected,
            tabIndex: '-1',
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
                    <List
                        className={classNames('menu', className, {
                            [`u-placement-${currentPlacement}`]: currentPlacement
                        })}
                        style={menuStyle}
                        {...(height && { autoHeight: false })}
                    >
                        <div
                            role="menu"
                            className="u-focus-outline-0"
                            tabIndex="-1"
                            ref={handleMenuRef}
                            onKeyDown={handleMenuKeyDown}
                        >
                            {items}
                        </div>
                    </List>
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
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    autoFocusItem: PropTypes.bool,
    onClose: PropTypes.func,
    onItemClick: PropTypes.func,
    onSelect: PropTypes.func
};

export default Menu;
