import React from 'react';
import PropTypes from 'prop-types';
import InboxIcon from '@svg-icons/feather/InboxIcon';

const GridEmptyItem = (props) => {
    const { children } = props;

    return (
        <div className="grid-empty-item">
            <InboxIcon className="grid-empty-item__icon" />
            <span className="grid-empty-item__text">{children}</span>
        </div>
    );
};

GridEmptyItem.propTypes = {
    children: PropTypes.node
};

export default GridEmptyItem;
