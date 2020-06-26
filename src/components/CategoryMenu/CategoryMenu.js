import React, {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
    useMemo,
    useCallback,
    memo
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Modal from '@ui/Modal';
import ClickAwayListener from '@ui/ClickAwayListener';
import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';
import { CategoryMenuContext } from './CategoryMenuContext';
import CategoryMenuHiddenGroups from './CategoryMenuHiddenGroups';
import CategoryMenuList from './CategoryMenuList';

const defaultActiveItemIndex = 0;

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

    const [activeItemIndex, setActiveItemIndex] = useState(-1);
    const [menuStyle, setMenuStyle] = useState({ ...style });

    const menuRef = useRef(null);
    const handleMenuRef = useForkRef(menuRef, ref);
    const hiddenGroupsRef = useRef(null);
    const activeItemRef = useRef(null);

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    const handleItemActive = useCallback((ev, { index, itemRef }) => {
        setActiveItemIndex(index);
        activeItemRef.current = itemRef.current;
    }, []);

    const handleItemClick = useEventCallback((ev, item) => {
        if (onItemClick) {
            onItemClick(ev, item);
        }
    });

    const handleHiddenGroupsBoundFocus = useEventCallback((ev) => {
        if (activeItemRef && activeItemRef.current) {
            activeItemRef.current.focus();
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
        if (open && activeItemIndex !== -1 && hiddenGroupsRef.current) {
            hiddenGroupsRef.current.focus();
        }
    }, [activeItemIndex, open]);

    useEffect(() => {
        if (open && activeItemIndex === -1) {
            setActiveItemIndex(defaultActiveItemIndex);
        }

        return () => {
            if (!open) {
                setActiveItemIndex(-1);
            }
        };
    }, [open, activeItemIndex]);

    const contextValue = useMemo(
        () => ({
            onItemClick: handleItemClick,
            onItemActive: handleItemActive,
            maxGroupItemsLength
        }),
        [maxGroupItemsLength, handleItemActive, handleItemClick]
    );

    if (!data || data.length === 0) {
        return null;
    }

    const hiddenGroupsData = (data[activeItemIndex] || {}).items;

    return (
        <Modal
            open={open}
            overflow
            disableBackdropClick
            backdropTransitionProps={{ timeout: 150, classNames: 'category-menu-backdrop' }}
            onClose={handleClose}
        >
            <CSSTransition in={open} classNames="category-menu" timeout={150} appear>
                <div className="category-menu" ref={handleMenuRef} style={menuStyle}>
                    <div className="category-menu__container">
                        <ClickAwayListener onClickAway={handleClose}>
                            <div
                                role="presentation"
                                className={classNames('category-menu__body', {
                                    'category-menu__body--show-hidden-groups':
                                        hiddenGroupsData && hiddenGroupsData.length > 0
                                })}
                            >
                                <CategoryMenuContext.Provider value={contextValue}>
                                    <CategoryMenuList activeIndex={activeItemIndex} data={data} />
                                    <CategoryMenuHiddenGroups
                                        data={hiddenGroupsData}
                                        ref={hiddenGroupsRef}
                                        onBoundFocus={handleHiddenGroupsBoundFocus}
                                    />
                                </CategoryMenuContext.Provider>
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
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            items: PropTypes.array
        })
    ),
    style: PropTypes.object,
    maxGroupItemsLength: PropTypes.number,
    onClose: PropTypes.func,
    onItemClick: PropTypes.func
};

export default memo(CategoryMenu);
