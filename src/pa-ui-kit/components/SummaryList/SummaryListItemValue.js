import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SummaryListItemValue = (props) => {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('summary-list__value', className)} {...other}>
            {children}
        </div>
    );
};

SummaryListItemValue.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default SummaryListItemValue;
