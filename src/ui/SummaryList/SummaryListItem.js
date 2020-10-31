import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SummaryListItem = (props) => {
    const { children, className, size, ...other } = props;

    return (
        <div
            className={classNames('summary-list__item', className, {
                'summary-list__item--large': size === 'large',
                'summary-list__item--small': size === 'small'
            })}
            {...other}
        >
            {children}
        </div>
    );
};

SummaryListItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large'])
};

export default SummaryListItem;
