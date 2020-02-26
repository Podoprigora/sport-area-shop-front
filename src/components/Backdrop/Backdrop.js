import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

const Backdrop = React.forwardRef(function Backdrop(props, ref) {
    const { open, className, transition, transitionProps, ...other } = props;
    const transitionPropsDefault = {
        appear: true,
        timeout: 300,
        classNames: 'backdrop'
    };

    const backdropComponent = (
        <div className={classNames('backdrop', className)} ref={ref} {...other} />
    );

    if (!transition) {
        return open && backdropComponent;
    }

    return (
        <CSSTransition in={open} {...{ ...transitionPropsDefault, ...transitionProps }}>
            {backdropComponent}
        </CSSTransition>
    );
});

Backdrop.propTypes = {
    open: PropTypes.bool,
    transition: PropTypes.bool,
    transitionProps: PropTypes.object,
    className: PropTypes.string
};

export default Backdrop;
