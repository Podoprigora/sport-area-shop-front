import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from '@ui/Link';

const CategoryMenuGroup = (props) => {
    const { data = {}, ...other } = props;

    if (!data || Object.keys(data).length === 0) {
        return null;
    }

    const { title } = data;

    return (
        <div className="category-menu__group">
            <Link tabIndex="0">{title}</Link>
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
