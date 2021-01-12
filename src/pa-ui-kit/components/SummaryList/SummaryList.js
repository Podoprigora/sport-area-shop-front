import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SummaryList = (props) => {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('summary-list', className)} {...other}>
            {children}
        </div>
    );
};

SummaryList.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default SummaryList;
