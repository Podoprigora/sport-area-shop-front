import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CategoryMenuItem from './CategoryMenuItem';

const CategoryMenuList = (props) => {
    const { activeIndex, data, ...other } = props;

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="category-menu__list">
            {data.map((item, index) => {
                return (
                    <CategoryMenuItem
                        key={index}
                        index={index}
                        data={item}
                        active={activeIndex === index}
                    />
                );
            })}
        </div>
    );
};

CategoryMenuList.propTypes = {
    activeIndex: PropTypes.number,
    data: PropTypes.array
};

export default memo(CategoryMenuList);
