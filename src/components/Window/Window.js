import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from '@components/Modal';
import modalPropTypes from '@components/Modal/modalPropTypes';
import { CSSTransition } from 'react-transition-group';

const Window = React.forwardRef(function Window(props, ref) {
    const {
        open,
        onClose,
        children,
        title,
        width,
        height,
        className,
        fillWidth,
        fullScreen,
        transitionProps,
        style,
        ...modalProps
    } = props;

    return (
        <Modal open={open} onClose={onClose} {...modalProps}>
            <CSSTransition in={open} timeout={300} classNames="window" appear unmountOnExit>
                <div className={classNames('window', className)} style={style} ref={ref}>
                    {children}
                </div>
            </CSSTransition>
        </Modal>
    );
});

Window.propTypes = {
    ...modalPropTypes,
    title: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    fullWidth: PropTypes.bool,
    fullScreen: PropTypes.bool,
    transitionProps: PropTypes.object,
    style: PropTypes.object
};

export default Window;
