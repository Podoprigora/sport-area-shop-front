import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { throttle } from 'lodash';

import Modal from '@ui/Modal';
import ClickAwayListener from '@ui/ClickAwayListener';
import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';
import CategoryMenuItem from './CategoryMenuItem';
import { CategoryMenuContext } from './CategoryMenuContext';

const defaultActiveIndex = 0;

const CategoryMenu = React.forwardRef(function CategoryMenu(props, ref) {
    const {
        open,
        anchorRef,
        data = [],
        maxGroupItemsLength = 5,
        style = {},
        onItemClick,
        onClose,
        ...other
    } = props;

    const [showHiddenGroups, setShowHiddenGroups] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(-1);
    const [menuHiddenGroupsRef, setMenuHiddenGroupsRef] = useState(null);

    const [menuStyle, setMenuStyle] = useState({ ...style });
    const [menuBodyStyle, setMenuBodyStyle] = useState(null);

    const menuRef = useRef(null);
    const menuBodyRef = useRef(null);
    const menuListRef = useRef(null);
    const handleMenuRef = useForkRef(menuRef, ref);

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    const handleActiveItem = useCallback((ev, { index, hasItems, hiddenGroupsRef }) => {
        setActiveItemIndex(index);
        setShowHiddenGroups(hasItems);

        if (hiddenGroupsRef) {
            setMenuHiddenGroupsRef(hiddenGroupsRef);
        }
    }, []);

    const handleItemClick = useEventCallback((ev, item) => {
        if (onItemClick) {
            onItemClick(ev, item);
        }
    });

    useEffect(() => {
        const updateMenuStyle = () => {
            if (open && anchorRef && anchorRef.current) {
                const { y, height } = anchorRef.current.getBoundingClientRect();
                const offset = y + height;

                const newStyle = { transform: `translate3d(0, ${offset}px, 0)` };

                setMenuStyle(newStyle);
            }
        };

        updateMenuStyle();

        document.addEventListener('scroll', updateMenuStyle, false);

        return () => {
            document.removeEventListener('scroll', updateMenuStyle, false);
        };
    }, [anchorRef, open]);

    useEffect(() => {
        const updateMenuBodyStyle = () => {
            if (
                open &&
                menuHiddenGroupsRef &&
                menuHiddenGroupsRef.current &&
                menuRef &&
                menuRef.current &&
                menuListRef &&
                menuListRef.current
            ) {
                const newStyle = { height: 'auto' };

                if (menuHiddenGroupsRef.current.offsetHeight > menuListRef.current.clientHeight) {
                    newStyle.height = menuHiddenGroupsRef.current.offsetHeight;
                }
                setMenuBodyStyle(newStyle);
            }
        };

        updateMenuBodyStyle();

        const throttledCallback = throttle(updateMenuBodyStyle, 500);

        window.addEventListener('resize', throttledCallback, false);

        return () => {
            window.removeEventListener('resize', throttledCallback, false);
        };
    }, [menuHiddenGroupsRef, open]);

    useEffect(() => {
        return () => {
            if (activeItemIndex && !open) {
                setActiveItemIndex(-1);
                setShowHiddenGroups(false);
                setMenuHiddenGroupsRef(null);
            }
        };
    }, [activeItemIndex, open]);

    const contextValue = useMemo(
        () => ({
            onItemClick: handleItemClick,
            maxGroupItemsLength
        }),
        [maxGroupItemsLength, handleItemClick]
    );

    if (!data || data.length === 0) {
        return null;
    }

    const items = data.map((item, index) => {
        const isActive = activeItemIndex === index;

        return (
            <CategoryMenuItem
                key={index}
                index={index}
                data={item}
                active={isActive}
                onClick={handleItemClick}
                onActiveItem={handleActiveItem}
            />
        );
    });

    if (activeItemIndex === -1 && typeof defaultActiveIndex === 'number') {
        items[defaultActiveIndex] = React.cloneElement(items[defaultActiveIndex], {
            autoFocus: true
        });
    }

    return (
        <Modal
            open={open}
            overflow
            // backdrop={false}
            disableBackdropClick
            backdropTransitionProps={{ timeout: 150, classNames: 'category-menu-backdrop' }}
            onClose={handleClose}
        >
            <CSSTransition in={open} classNames="category-menu" timeout={150} appear>
                <div className="category-menu" ref={handleMenuRef} style={menuStyle}>
                    <div className="category-menu__container">
                        <ClickAwayListener onClickAway={handleClose}>
                            <div
                                className={classNames('category-menu__body', {
                                    'category-menu__body--show-hidden-groups': showHiddenGroups
                                })}
                                style={menuBodyStyle}
                                ref={menuBodyRef}
                            >
                                <div className="category-menu__list" ref={menuListRef}>
                                    <CategoryMenuContext.Provider value={contextValue}>
                                        {items}
                                    </CategoryMenuContext.Provider>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
            </CSSTransition>
        </Modal>
    );
});

CategoryMenu.propTypes = {
    open: PropTypes.bool,
    anchorRef: PropTypes.object,
    data: PropTypes.array,
    style: PropTypes.object,
    maxGroupItemsLength: PropTypes.number,
    onClose: PropTypes.func,
    onItemClick: PropTypes.func
};

export default CategoryMenu;
