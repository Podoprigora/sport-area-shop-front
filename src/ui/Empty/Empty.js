import React from 'react';
import PropTypes from 'prop-types';
import InboxIcon from '@svg-icons/feather/InboxIcon';

const Empty = (props) => {
    const { children } = props;

    return (
        <div className="empty">
            <InboxIcon className="empty__icon" />
            <span className="empty__text">{children}</span>
        </div>
    );
};

Empty.propTypes = {
    children: PropTypes.node
};

export default Empty;
