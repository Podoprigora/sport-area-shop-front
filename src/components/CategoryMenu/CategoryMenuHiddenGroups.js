import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import CategoryMenuGroup from './CategoryMenuGroup';

const CategoryMenuHiddenGroups = React.forwardRef(function CategoryMenuHiddenGroups(props, ref) {
    const { data = [], active = false, onBoundFocus, ...other } = props;

    const handleBoundFocus = useEventCallback((ev) => {
        if (onBoundFocus) {
            onBoundFocus(ev);
        }
    });

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div role="presentation" className="category-menu__hidden-groups">
            <div
                role="presentation"
                tabIndex="0"
                className="u-focus-outline-0"
                data-test="starting-focus-bound"
                onFocus={handleBoundFocus}
            />
            <div
                role="presentation"
                className="category-menu__hidden-groups-body u-focus-outline-0"
                tabIndex="-1"
                ref={ref}
            >
                {data.map((item, index) => {
                    return <CategoryMenuGroup key={index} data={item} />;
                })}
            </div>
            <div
                role="presentation"
                tabIndex="0"
                className="u-focus-outline-0"
                data-test="ending-focus-bound"
                onFocus={handleBoundFocus}
            />
        </div>
    );
});

CategoryMenuHiddenGroups.propTypes = {
    data: PropTypes.array,
    active: PropTypes.bool,
    onBoundFocus: PropTypes.func
};

export default memo(CategoryMenuHiddenGroups);
