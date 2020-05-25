import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import useEventCallback from '@components/hooks/useEventCallback';
import useForkRef from '@components/hooks/useForkRef';
import Modal from '@components/Modal';
import { usePopper } from '@components/Popper';
import List from '@components/List';
import Portal from '@components/Portal';

const moveFocus = (menuElement, offset = 1) => {
    const activeElement = document.activeElement;
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

    if (nextElement) {
        nextElement.focus();
    }
};

const defaultActiveIndex = -1;

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
    const [menuStyle, setMenuStyle] = useState({
        ...style,
        ...(width && { width }),
        ...(height && { height })
    });

    const menuRef = useRef(null);
    const handleMenuRef = useForkRef(menuRef, ref);
    const activeIndexRef = useRef(defaultActiveIndex);

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

                moveFocus(menuRef.current, 1);
                break;
            }
            case 'ArrowUp': {
                ev.preventDefault();

                moveFocus(menuRef.current, -1);
                break;
            }
            default:
                break;
        }
    });

    const handleItemClick = useCallback(
        (child, index) => (ev) => {
            if (child.props.onClick) {
                child.props.onClick(ev);
            }

            onItemClick(ev, index);
        },
        [onItemClick]
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

        if (open && activeIndexRef.current === defaultActiveIndex) {
            menuRef.current.focus();
        } else if (!open && anchorRef.current) {
            anchorRef.current.focus();
        }

        return undefined;
    }, [open, popperState, anchorRef]);

    // Update menu width according to the anchor element width
    useEffect(() => {
        if (anchorRef.current && autoWidth) {
            const anchorWidth = anchorRef.current.clientWidth;

            setMenuStyle((prevStyle) => {
                return { ...prevStyle, width: anchorWidth };
            });
        }
    }, [anchorRef, autoWidth]);

    // Render

    React.Children.forEach(children, (child, index) => {
        if (child.props.selected && !child.props.disabled) {
            activeIndexRef.current = index;
        }
    });

    const items = React.Children.map(children, (child, index) => {
        if (
            autoFocusItem &&
            activeIndexRef.current === defaultActiveIndex &&
            !child.props.disabled
        ) {
            activeIndexRef.current = index;
        }

        return React.cloneElement(child, {
            autoFocus: activeIndexRef.current === index,
            tabIndex: '0',
            onClick: handleItemClick(child, index)
        });
    });

    const currentPlacement = popperState.placement || placement;

    const popperContent = (
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
    );

    return (
        <Modal open={open || !exited} backdrop={false} onClose={handleModalClose}>
            {popperContent}
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
    onItemClick: PropTypes.func
};

export default Menu;
