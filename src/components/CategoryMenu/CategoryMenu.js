import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '@ui/Modal';
import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';
import { usePopper } from '@ui/Popper';
import ArrowLeftIcon from '@svg-icons/feather/ArrowLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import FolderIcon from '@svg-icons/feather/FolderIcon';
import TagIcon from '@svg-icons/feather/TagIcon';

const CategoryMenu = React.forwardRef(function CategoryMenu(props, ref) {
    const { open, onClose, anchorRef, style = {}, ...other } = props;

    const [menuStyle, setMenuStyle] = useState({ ...style });

    const menuRef = useRef(null);
    const handleMenuRef = useForkRef(menuRef, ref);
    const [menuSubRef, setMenuSubRef] = useState(null);

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    useLayoutEffect(() => {
        const updateMenuStyle = () => {
            if (anchorRef && anchorRef.current) {
                const { y, height } = anchorRef.current.getBoundingClientRect();
                const offset = y + height;

                const newStyle = { transform: `translateY(${offset}px)` };

                // if (menuSubRef) {
                //     newStyle.height = menuSubRef.clientHeight;
                // }

                setMenuStyle(newStyle);
            }
        };

        updateMenuStyle();

        if (menuSubRef) {
            console.log(menuSubRef.clientHeight);
        }

        document.addEventListener('scroll', updateMenuStyle, false);

        return () => {
            document.removeEventListener('scroll', updateMenuStyle, false);
        };
    }, [anchorRef, menuSubRef]);

    return (
        <Modal open={open} onClose={handleClose} disableRestoreFocus>
            <div className="category-menu" ref={handleMenuRef} style={menuStyle}>
                <div className="category-menu__container">
                    <div className="category-menu__body">
                        <div className="category-menu__list">
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Streetwear</div>

                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                                <div className="category-menu__sub" ref={setMenuSubRef}>
                                    sub category
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Shoes</div>
                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Accessories</div>
                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Water Sports</div>
                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Skate</div>
                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Snowboard</div>
                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Ski</div>
                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <FolderIcon />
                                </div>
                                <div className="category-menu__item-text">Outdoor</div>
                                <div className="category-menu__item-icon category-menu__item-icon--right">
                                    <ChevronRightIcon size="medium" />
                                </div>
                            </button>
                            <button type="button" className="category-menu__item">
                                <div className="category-menu__item-icon">
                                    <TagIcon />
                                </div>
                                <div className="category-menu__item-text">Outlet </div>
                            </button>
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
    style: PropTypes.object,
    onClose: PropTypes.func
};

export default CategoryMenu;
