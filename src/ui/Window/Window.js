import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Modal, { propTypes as modalPropTypes } from '@ui/Modal';
import DraggableWrap from '@ui/DraggableWrap';
import { WindowContext } from './WindowContext';

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

    const contextValue = useMemo(
        () => ({
            draggable
        }),
        [draggable]
    );

    return (
        <Modal open={open} onClose={onClose} {...modalProps}>
            <CSSTransition
                in={open}
                timeout={250}
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
                        <WindowContext.Provider value={contextValue}>
                            {children}
                        </WindowContext.Provider>
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
