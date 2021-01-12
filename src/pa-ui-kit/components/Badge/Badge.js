import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Badge = (props) => {
    const { children, value, placement = 'top-right' } = props;

    return (
        <div className="badge-wrap">
            {children}
            {value > 0 && (
                <div
                    className={classNames('badge', {
                        [`badge--${placement}`]: placement
                    })}
                >
                    {value}
                </div>
            )}
        </div>
    );
};

Badge.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number,
    placement: PropTypes.oneOf([
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'center-right',
        'center-left'
    ])
};

export default Badge;
