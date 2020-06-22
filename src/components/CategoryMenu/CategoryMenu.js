import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from '@ui/Modal';
import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';
import CategoryMenuItem from './CategoryMenuItem';
import { CategoryMenuContext } from './CategoryMenuContext';

const defaultActiveIndex = 0;

const CategoryMenu = React.forwardRef(function CategoryMenu(props, ref) {
    const { open, onClose, anchorRef, data = [], style = {}, ...other } = props;

    const [showHiddenGroups, setShowHiddenGroups] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(-1);
    const [menuStyle, setMenuStyle] = useState({ ...style });
    const [menuBodyStyle, setMenuBodyStyle] = useState(null);

    const menuRef = useRef(null);
    const menuBodyRef = useRef(null);
    const menuListRef = useRef(null);
    const handleMenuRef = useForkRef(menuRef, ref);
    const [menuHiddenGroupsRef, setMenuHiddenGroupsRef] = useState(null);

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

    useEffect(() => {
        const updateMenuStyle = () => {
            if (anchorRef && anchorRef.current) {
                const { y, height } = anchorRef.current.getBoundingClientRect();
                const offset = y + height;

                const newStyle = { transform: `translate3d(0, ${offset}px, 0)` };

                setMenuStyle(newStyle);
            }
        };

        if (open) {
            updateMenuStyle();
        }

        document.addEventListener('scroll', updateMenuStyle, false);

        return () => {
            document.removeEventListener('scroll', updateMenuStyle, false);
        };
    }, [anchorRef, open]);

    useEffect(() => {
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
    }, [menuHiddenGroupsRef, open]);

    useEffect(() => {
        return () => {
            if (activeItemIndex && !open) {
                setActiveItemIndex(-1);
            }
        };
    }, [activeItemIndex, open]);

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
        <Modal open={open} onClose={handleClose}>
            <div className="category-menu" ref={handleMenuRef} style={menuStyle}>
                <div className="category-menu__container">
                    <div
                        className={classNames('category-menu__body', {
                            'category-menu__body--show-hidden-groups': showHiddenGroups
                        })}
                        style={menuBodyStyle}
                        ref={menuBodyRef}
                    >
                        <div className="category-menu__list" ref={menuListRef}>
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

CategoryMenu.propTypes = {
    open: PropTypes.bool,
    anchorRef: PropTypes.object,
    data: PropTypes.array,
    style: PropTypes.object,
    onClose: PropTypes.func
};

export default CategoryMenu;
