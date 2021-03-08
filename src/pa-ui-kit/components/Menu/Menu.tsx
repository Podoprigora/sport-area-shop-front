import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { throttle } from 'lodash';
import { State as PopperState } from '@popperjs/core';

import { useEventCallback, useMergedRefs } from '../utils';
import { Modal } from '../Modal';
import { PopperProps, usePopper } from '../Popper';
import { List, ListProps } from '../List';
import { Portal } from '../Portal';
import { ClickAwayListener } from '../ClickAwayListener';
import { PickPropType } from '../utils/types';

export interface MenuProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains the set of `MenuItem` or `ListItem` components
     */
    children?: React.ReactElement | React.ReactElement[];
    open?: boolean;
    placement?: PickPropType<PopperProps, 'placement'>;
    anchorRef?: PickPropType<PopperProps, 'anchorRef'>;
    /**
     * Make width of `Menu` is equal to `anchorElement` width.
     */
    autoWidth?: boolean;
    width?: number;
    listProps?: Partial<ListProps>;
    /**
     * Autofocus first item.
     */
    autoFocusItem?: boolean;
    /**
     * Apply `Modal` as a wrapper component.
     */
    modal?: boolean;
    offset?: [number, number];
    onClose?: () => void;
    onItemClick?: (ev: React.SyntheticEvent, index: number) => void;
}

// Move focus to the next element of Menu item if it's not disabled and it has role of button.
const moveFocus = (menuElement: HTMLElement, offset = 1) => {
    const activeElement = document.activeElement;
    let nextElement: Element | null = null;

    if (activeElement === menuElement) {
        nextElement = offset > 0 ? menuElement.firstElementChild : menuElement.lastElementChild;
    } else if (offset > 0 && activeElement) {
        nextElement = activeElement.nextElementSibling || menuElement.firstElementChild;
    } else if (offset < 0 && activeElement) {
        nextElement = activeElement.previousElementSibling || menuElement.lastElementChild;
    }

    while (nextElement && nextElement !== activeElement) {
        if (
            nextElement.getAttribute('role') !== 'button' ||
            nextElement.getAttribute('aria-disabled') === 'true'
        ) {
            nextElement =
                offset > 0 ? nextElement.nextElementSibling : nextElement.previousElementSibling;

            if (!nextElement && activeElement !== menuElement) {
                nextElement =
                    offset > 0 ? menuElement.firstElementChild : menuElement.lastElementChild;
            }
        } else {
            break;
        }
    }

    if (nextElement) {
        (nextElement as HTMLElement).focus();
    }
};

const defaultActiveIndex = -1;

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(props, forwardedRef) {
    const {
        open,
        anchorRef = { current: null },
        placement = 'bottom-start',
        children,
        autoFocusItem = false,
        autoWidth = false,
        modal = true,
        width,
        listProps = {},
        /**
         * Offset of the current position `[x, y]`.
         */
        offset = [0, 2],
        className,
        style,
        onClose,
        onItemClick
    }: MenuProps = props;

    const { referenceRef, popperRef, popperInstance } = usePopper({
        placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset
                }
            }
        ]
    });
    const [exited, setExited] = useState(true);
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({
        ...style,
        ...(width && { width })
    });

    const menuRef = useRef<HTMLDivElement | null>(null);
    const handleMenuRef = useMergedRefs(menuRef, forwardedRef);
    const activeIndexRef = useRef<number>(defaultActiveIndex);

    const childrenRef = useRef<React.ReactElement[]>([]);
    childrenRef.current = children
        ? (React.Children.toArray(children) as React.ReactElement[])
        : [];

    // Handlers

    const handleClose = useEventCallback(() => {
        if (onClose) {
            onClose();
        }
    });

    const handleModalClose = useCallback(() => {
        handleClose();
    }, [handleClose]);

    const handleClickAway = useCallback(() => {
        handleClose();
    }, [handleClose]);

    const handleMenuKeyDown = useEventCallback((ev) => {
        switch (ev.key) {
            case 'Tab':
                ev.preventDefault();

                handleClose();
                break;
            case 'ArrowDown': {
                ev.preventDefault();

                moveFocus(menuRef.current as HTMLElement, 1);
                break;
            }
            case 'ArrowUp': {
                ev.preventDefault();

                moveFocus(menuRef.current as HTMLElement, -1);
                break;
            }
            case 'Escape': {
                // Because Modal has contained this kind of functionality
                if (!modal) {
                    handleClose();
                }
                break;
            }
            default:
                break;
        }
    });

    const handleTransitionEnter = useCallback(() => {
        if (exited) {
            setExited(false);
        }
    }, [exited]);

    const handleTransitionExited = useCallback(() => {
        if (!exited) {
            setExited(true);
        }
    }, [exited]);

    // Effects

    // Set Popper referenceRef
    useEffect(() => {
        if (anchorRef && anchorRef.current) {
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

        return () => {
            activeIndexRef.current = defaultActiveIndex;
        };
    }, [open, popperInstance, anchorRef]);

    // Update menu width according to the anchor element width
    useEffect(() => {
        function updateStyle() {
            if (anchorRef.current && open && autoWidth) {
                const anchorWidth = anchorRef.current.offsetWidth;

                setMenuStyle((prevStyle) => {
                    return { ...prevStyle, width: anchorWidth };
                });
            }
        }

        if (width) {
            return undefined;
        }

        updateStyle();

        const throttledCallback = throttle(updateStyle, 166);

        window.addEventListener('resize', throttledCallback, false);

        return () => {
            window.removeEventListener('resize', throttledCallback, false);
        };
    }, [anchorRef, autoWidth, open, width]);

    // Render

    const isClosed = !open && exited;

    childrenRef.current.forEach((child, index) => {
        if (child.props.selected && !child.props.disabled) {
            activeIndexRef.current = index;
        }
    });

    // To accomplish a proper update items.
    const updatedActiveIndex = activeIndexRef.current;

    const items = useMemo(() => {
        if (isClosed) {
            return null;
        }

        const handleItemClick = (child: React.ReactElement, index: number) => (
            ev: React.SyntheticEvent
        ) => {
            if (child.props.onClick) {
                child.props.onClick(ev);
            }

            if (onItemClick) {
                onItemClick(ev, index);
            }
        };

        return childrenRef.current.map((child, index) => {
            if (
                autoFocusItem &&
                updatedActiveIndex === defaultActiveIndex &&
                child.props.children &&
                !child.props.disabled
            ) {
                activeIndexRef.current = index;
            }

            return React.cloneElement(child, {
                autoFocus: activeIndexRef.current === index,
                tabIndex: 0,
                onClick: handleItemClick(child, index)
            });
        });
    }, [isClosed, autoFocusItem, updatedActiveIndex, onItemClick]);

    if (isClosed) {
        return null;
    }

    const popperState: Partial<PopperState> = (popperInstance && popperInstance.state) || {};
    const currentPlacement = popperState.placement || placement;

    const popperContent = (
        <div className="popper" ref={popperRef}>
            <CSSTransition
                appear
                in={open && !!popperInstance}
                timeout={{ enter: 250, exit: 150 }}
                classNames="menu"
                onEnter={handleTransitionEnter}
                onExited={handleTransitionExited}
            >
                <List
                    className={classNames('menu', className, {
                        [`u-placement-${currentPlacement}`]: currentPlacement
                    })}
                    style={menuStyle}
                    {...listProps}
                >
                    <div
                        role="menu"
                        className="u-focus-outline-0"
                        tabIndex={-1}
                        ref={handleMenuRef}
                        onKeyDown={handleMenuKeyDown}
                    >
                        {items}
                    </div>
                </List>
            </CSSTransition>
        </div>
    );

    if (modal) {
        return (
            <Modal
                open={!isClosed}
                backdrop={false}
                disableScrollLock
                disableFocusBounding
                disableRestoreFocus
                onClose={handleModalClose}
            >
                {popperContent}
            </Modal>
        );
    }

    return (
        <Portal>
            <ClickAwayListener onClickAway={handleClickAway}>{popperContent}</ClickAwayListener>
        </Portal>
    );
});
