import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

const Mask = React.forwardRef(function Mask(props, ref) {
    const { open, fixed, className, children, ...other } = props;

    return (
        <CSSTransition in={open} timeout={300} classNames="mask" unmountOnExit>
            <div
                className={classNames('mask', className, {
                    'mask--fixed': fixed
                })}
                {...other}
                ref={ref}
            >
                {children}
            </div>
        </CSSTransition>
    );
});

Mask.propTypes = {
    open: PropTypes.bool,
    fixed: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.element
};

export default Mask;
