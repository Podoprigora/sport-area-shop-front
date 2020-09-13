import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageHeader = (props) => {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('page__header', className)} {...other}>
            {children}
        </div>
    );
};

PageHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default PageHeader;
