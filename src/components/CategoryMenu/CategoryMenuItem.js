import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { throttle } from 'lodash';

import useEventCallback from '@ui/hooks/useEventCallback';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import CategoryMenuHiddenGroups from './CategoryMenuHiddenGroups';
import { useCategoryMenu } from './CategoryMenuContext';

const CategoryMenuItem = (props) => {
    const { data, index, active, autoFocus, onActiveItem, ...other } = props;

    const nodeRef = useRef(null);
    const hiddenGroupsRef = useRef(null);
    const timerRef = useRef(null);
    const mousePositionX = useRef(0);
    const mousePositionY = useRef(0);

    const { title, items = [] } = data || {};

    const handleActive = useEventCallback((ev) => {
        if (onActiveItem) {
            onActiveItem(ev, { index, hasItems: items.length > 0, hiddenGroupsRef });
        }
    });

    const handleMouseMove = useEventCallback((ev) => {
        mousePositionX.current = ev.clientX;
        mousePositionY.current = ev.clientY;
    });

    const handleMouseEnter = useEventCallback((ev) => {
        const clientX = ev.clientX;
        const clientY = ev.clientY;

        timerRef.current = setTimeout(() => {
            if (
                Math.abs(clientX - mousePositionX.current) < 4 ||
                Math.abs(clientY - mousePositionY.current) < 4
            ) {
                handleActive(ev);
            }
        }, 25);
    });

    const handleMouseLeave = useEventCallback((ev) => {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        mousePositionX.current = 0;
        mousePositionY.current = 0;
    });

    const handleFocus = useEventCallback((ev) => {
        handleActive(ev);
    });

    useEffect(() => {
        if (autoFocus && nodeRef && nodeRef.current) {
            nodeRef.current.focus();
        }
    }, [autoFocus, handleActive]);

    if (!title) {
        return null;
    }

    return (
        <button
            type="button"
            className={classNames('category-menu__item', {
                'category-menu__item--active': active
            })}
            ref={nodeRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
        >
            <div className="category-menu__item-text">{title}</div>

            {items && items.length > 0 && (
                <>
                    <div className="category-menu__item-icon category-menu__item-icon--right">
                        <ChevronRightIcon size="medium" />
                    </div>
                    <CategoryMenuHiddenGroups active={active} data={items} ref={hiddenGroupsRef} />
                </>
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
    onActiveItem: PropTypes.func
};

export default memo(CategoryMenuItem);
