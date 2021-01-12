import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowRightIcon from '@ui/svg-icons/material/KeyboardArrowRightIcon';
import useEventCallback from '@ui/hooks/useEventCallback';
import { useCategoryMenu } from './CategoryMenuContext';

const CategoryMenuGroup = (props) => {
    const { data = {}, ...other } = props;

    const { maxGroupItemsLength = 5, onItemClick } = useCategoryMenu() || {};

    const handleLinkMouseDown = useCallback((ev) => {
        ev.preventDefault();
    }, []);

    const handleClick = useEventCallback((ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (onItemClick) {
            onItemClick(ev, data);
        }
    });

    const handleItemClick = useEventCallback((item) => (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (onItemClick) {
            onItemClick(ev, item);
        }
    });

    if (!data || Object.keys(data).length === 0) {
        return null;
    }

    const { title, picture, items = [] } = data || {};

    const hasOverflow = items.length > maxGroupItemsLength;

    return (
        <div className="category-menu__group">
            <div className="category-menu__group-img-box">
                <img src={picture} alt={title} className="category-menu__group-img" />
            </div>
            <a
                href="#"
                className="category-menu__group-link category-menu__group-title"
                tabIndex="0"
                onMouseDown={handleLinkMouseDown}
                onClick={handleClick}
            >
                {title}
            </a>
            {items.length > 0 &&
                items.slice(0, maxGroupItemsLength).map((item, index) => {
                    const { title: itemTitle = '' } = item;
                    return (
                        <a
                            href="#"
                            key={index}
                            className="category-menu__group-link category-menu__group-item"
                            tabIndex="0"
                            onMouseDown={handleLinkMouseDown}
                            onClick={handleItemClick(item)}
                        >
                            {itemTitle}
                        </a>
                    );
                })}

            {hasOverflow && (
                <a
                    href="#"
                    className="category-menu__group-link category-menu__group-all-link"
                    tabIndex="0"
                    onMouseDown={handleLinkMouseDown}
                    onClick={handleClick}
                >
                    <KeyboardArrowRightIcon size="small" />
                    all categories
                </a>
            )}
        </div>
    );
};

CategoryMenuGroup.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        picture: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string
            })
        )
    })
};

export default memo(CategoryMenuGroup);
