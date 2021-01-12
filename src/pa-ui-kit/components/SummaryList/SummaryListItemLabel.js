import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SummaryListItemLabel = (props) => {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('summary-list__label', className)} {...other}>
            {children}
        </div>
    );
};

SummaryListItemLabel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default SummaryListItemLabel;
