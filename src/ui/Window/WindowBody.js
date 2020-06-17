import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WindowBody = (props) => {
    const { children, className, painted, ...other } = props;

    return (
        <div
            className={classNames('window__body', className, {
                'window__body--painted': painted
            })}
            {...other}
        >
            {children}
        </div>
    );
};

WindowBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    painted: PropTypes.bool
};

export default WindowBody;
