import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Modal from '@components/Modal';
import modalPropTypes from '@components/Modal/modalPropTypes';
import DraggableWrap from '@components/DraggableWrap';

const Window = React.forwardRef(function Window(props, ref) {
    const {
        open,
        onClose,
        children,
        title,
        className,
        maxWidth,
        fullScreen,
        draggable = true,
        transitionProps,
        style,
        ...modalProps
    } = props;

    const customStyles = {
        ...(maxWidth && { maxWidth })
    };

    return (
        <Modal open={open} onClose={onClose} {...modalProps}>
            <CSSTransition
                in={open}
                timeout={300}
                classNames="window"
                appear
                unmountOnExit
                {...transitionProps}
            >
                <DraggableWrap disabled={!draggable}>
                    <div
                        className={classNames('window', className, {
                            'window--fullscreen': fullScreen
                        })}
                        style={{ ...customStyles, ...style }}
                        ref={ref}
                    >
                        {children &&
                            React.Children.map(children, (child) => {
                                return React.cloneElement(child, {
                                    draggable
                                });
                            })}
                    </div>
                </DraggableWrap>
            </CSSTransition>
        </Modal>
    );
});

Window.propTypes = {
    ...modalPropTypes,
    title: PropTypes.string,
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fullScreen: PropTypes.bool,
    draggable: PropTypes.bool,
    transitionProps: PropTypes.object,
    style: PropTypes.object
};

export default Window;
