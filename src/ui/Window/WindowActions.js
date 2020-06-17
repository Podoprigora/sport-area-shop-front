import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WindowActions = (props) => {
    const { children, align = 'right', className, ...other } = props;

    return (
        <div
            className={classNames('window__actions', className, {
                [`window__actions--align-${align}`]: align
            })}
        >
            {children}
        </div>
    );
};

WindowActions.propTypes = {
    children: PropTypes.node,
    align: PropTypes.string,
    className: PropTypes.string
};

export default WindowActions;
