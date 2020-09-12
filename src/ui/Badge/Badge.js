import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => {
    const { children, value } = props;

    return (
        <div className="badge-wrap">
            {children}
            {value > 0 && <div className="badge">{value}</div>}
        </div>
    );
};

Badge.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number
};

export default Badge;
