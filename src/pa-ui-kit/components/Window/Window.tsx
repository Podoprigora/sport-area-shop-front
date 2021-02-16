import React, { useMemo } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

import { Modal, ModalProps } from '../Modal';
import { DraggableWrap } from '../DraggableWrap';
import { createCtx } from '../utils';

export interface WindowProps extends Omit<ModalProps, 'children'> {
    /**
     * Normally contains of `WindowHeader`, `WindowBody`, `WindowActions` components.
     */
    children?: React.ReactNode;
    maxWidth?: number;
    fullScreen?: boolean;
    draggable?: boolean;
    transitionProps?: CSSTransitionProps;
}

export type WindowContextValue = {
    draggable?: boolean;
};

const WindowContext = createCtx<WindowContextValue>();

export const useWindowContext = WindowContext.useContext;

export const Window = React.forwardRef<HTMLDivElement, WindowProps>(function Window(props, ref) {
    const {
        open,
        onClose,
        children,
        className,
        maxWidth,
        fullScreen,
        draggable = true,
        transitionProps,
        style,
        ...modalProps
    } = props;

    const customStyles = {
        ...(maxWidth && !fullScreen && { maxWidth })
    };

    const contextValue = useMemo<WindowContextValue>(
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
