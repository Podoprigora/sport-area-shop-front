import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WindowActions = (props) => {
    const { children, justify = 'right', className, ...other } = props;

    return (
        <div
            className={classNames('window__actions', className, {
                [`window__actions--justify-${justify}`]: justify
            })}
        >
            {children}
        </div>
    );
};

WindowActions.propTypes = {
    children: PropTypes.node,
    justify: PropTypes.oneOf(['left', 'right', 'center', 'stretch']),
    className: PropTypes.string
};

export default WindowActions;
