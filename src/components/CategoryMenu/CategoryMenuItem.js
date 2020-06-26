import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventCallback from '@ui/hooks/useEventCallback';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import { useCategoryMenu } from './CategoryMenuContext';

const CategoryMenuItem = (props) => {
    const { data, index, active, autoFocus, ...other } = props;

    const { onItemActive, onItemClick } = useCategoryMenu() || {};

    const nodeRef = useRef(null);
    const timerRef = useRef(null);
    const mousePositionX = useRef(0);

    const { title, items = [] } = data || {};
    const hasItems = items.length > 0;

    const handleActive = useEventCallback((ev) => {
        if (onItemActive) {
            onItemActive(ev, { index, hasItems, itemRef: nodeRef });
        }
    });

    const handleMouseMove = useEventCallback((ev) => {
        mousePositionX.current = ev.clientX;
    });

    const handleMouseEnter = useEventCallback((ev) => {
        const clientX = ev.clientX;

        timerRef.current = setTimeout(() => {
            const diffX = mousePositionX.current - clientX;

            if (diffX < 2) {
                handleActive(ev);
            }
        }, 20);
    });

    const handleMouseLeave = useEventCallback((ev) => {
        clearTimeout(timerRef.current);

        timerRef.current = null;
        mousePositionX.current = 0;
    });

    const handleFocus = useEventCallback((ev) => {
        if (!active) {
            handleActive(ev);
        }
    });

    const handleClick = useEventCallback((ev) => {
        ev.preventDefault();

        if (onItemClick) {
            onItemClick(ev, data);
        }
    });

    const handleTouchEnd = useEventCallback((ev) => {
        ev.preventDefault();

        handleActive(ev);
    });

    if (!title) {
        return null;
    }

    return (
        <button
            type="button"
            className={classNames('category-menu__item u-focus-outline-0', {
                'category-menu__item--active': active
            })}
            tabIndex="0"
            ref={nodeRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onClick={handleClick}
            onTouchEnd={handleTouchEnd}
        >
            <div className="category-menu__item-text">{title}</div>
            {hasItems && (
                <div className="category-menu__item-icon category-menu__item-icon--right">
                    <ChevronRightIcon size="medium" />
                </div>
            )}
        </button>
    );
};

CategoryMenuItem.propTypes = {
    index: PropTypes.number.isRequired,
    active: PropTypes.bool,
    autoFocus: PropTypes.bool,
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        items: PropTypes.array
    }),
    onActive: PropTypes.func,
    onClick: PropTypes.func
};

export default memo(CategoryMenuItem);
