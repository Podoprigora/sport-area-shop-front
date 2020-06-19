import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

const Mask = React.forwardRef(function Mask(props, ref) {
    const { open, className, children, ...other } = props;

    return (
        <CSSTransition in={open} timeout={150} classNames="mask" unmountOnExit>
            <div className={classNames('mask', className)} {...other} ref={ref}>
                {children}
            </div>
        </CSSTransition>
    );
});

Mask.propTypes = {
    open: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.element
};

export default Mask;
