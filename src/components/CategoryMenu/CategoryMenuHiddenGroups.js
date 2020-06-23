import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CategoryMenuGroup from './CategoryMenuGroup';

const CategoryMenuHiddenGroups = React.forwardRef(function CategoryMenuHiddenGroups(props, ref) {
    const { data = [], active = false, ...other } = props;

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div
            className={classNames('category-menu__hidden-groups', {
                'category-menu__hidden-groups--active': active
            })}
            ref={ref}
        >
            {data.map((item, index) => {
                return <CategoryMenuGroup key={index} data={item} />;
            })}
        </div>
    );
});

CategoryMenuHiddenGroups.propTypes = {
    data: PropTypes.array,
    active: PropTypes.bool
};

export default memo(CategoryMenuHiddenGroups);
