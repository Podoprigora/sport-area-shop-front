import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scrollbarSize } from 'dom-helpers';

import Portal from '@ui/Portal';
import Backdrop from '@ui/Backdrop';
import FocusBounding from '@ui/FocusBounding';
import useEventCallback from '@ui/hooks/useEventCallback';
import setRef from '@ui/utils/setRef';
import useEventListener from '@ui/hooks/useEventListener';
import ModalManager from './ModalManager';

const isOverflowing = () => {
    return window.innerWidth > document.documentElement.clientWidth;
};

const setBodyOverflow = (overflow = true) => {
    const { style } = document.body;

    style['overflow'] = overflow ? 'auto' : 'hidden';
    style['paddingRight'] = overflow ? '0' : `${scrollbarSize()}px`;
};

const getHasTransition = (props) => {
    return props.children && props.children.props.hasOwnProperty('in');
};

const manager = new ModalManager();

const Modal = React.forwardRef(function Modal(props, ref) {
    const {
        children,
        open,
        className,
        centered,
        backdrop = true,
        overflow,
        disableRestoreFocus = false,
        disableFocusBounding = false,
        disableBackdropClick = false,
        disableEscapeKeyDown = false,
        disableScrollLock = false,
        backdropTransitionProps,
        onEscapeKeyDown,
        onClose,
        onOpen,
        ...other
    } = props;

    const [exited, setExited] = useState(true);
    const [modalNode, setModalNode] = useState(null);
    const backdropRef = useRef(null);
    const triggerRef = useRef(null);
    const hasTransition = getHasTransition(props);

    const isTopModal = useCallback(() => {
        return modalNode && manager.isTopModal(modalNode);
    }, [modalNode]);

    // Handlers

    const handleOpen = useCallback(() => {
        if (onOpen) {
            onOpen();
        }
    }, [onOpen]);

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const handleEnter = useEventCallback(() => {
        setExited(false);

        if (props.children.props && props.children.props.onEnter) {
            props.children.props.onEnter();
        }
    });

    const handleExited = useEventCallback(() => {
        setExited(true);

        if (props.children.props && props.children.props.onExited) {
            props.children.props.onExited();
        }
    });

    const handleDocumentKeyDown = useCallback(
        (ev) => {
            ev.stopPropagation();

            if (!modalNode) {
                return;
            }

            const isValidTarget = modalNode.contains(ev.target);

            if (ev.key === 'Escape' && !disableEscapeKeyDown && isValidTarget && isTopModal()) {
                if (onEscapeKeyDown) {
                    onEscapeKeyDown(ev);
                } else {
                    handleClose();
                }
            }
        },
        [modalNode, disableEscapeKeyDown, handleClose, onEscapeKeyDown, isTopModal]
    );

    const handleClick = useCallback(
        (ev) => {
            if (
                !backdrop &&
                !disableBackdropClick &&
                modalNode &&
                modalNode.isEqualNode(ev.target)
            ) {
                handleClose();
            }
        },
        [backdrop, modalNode, disableBackdropClick, handleClose]
    );

    const handleBackdropClick = useCallback(
        (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            if (
                !disableBackdropClick &&
                backdropRef.current &&
                backdropRef.current.isEqualNode(ev.target)
            ) {
                handleClose();
            }
        },
        [handleClose, disableBackdropClick]
    );

    const handlePortalRendered = useCallback(() => {
        handleOpen();
    }, [handleOpen]);

    // Effects

    useEffect(() => {
        if (open && modalNode) {
            setRef(ref, modalNode);

            return () => {
                setRef(ref, null);
            };
        }

        return undefined;
    }, [open, modalNode, ref]);

    useEffect(() => {
        if (disableRestoreFocus) {
            return undefined;
        }

        if (open) {
            triggerRef.current = document.activeElement;

            return () => {
                triggerRef.current.focus();
            };
        }

        return undefined;
    }, [open, disableRestoreFocus]);

    useEffect(() => {
        if (modalNode) {
            manager.add(modalNode);

            return () => {
                manager.remove(modalNode);
            };
        }

        return undefined;
    }, [modalNode]);

    // Toggle the body scrollbar visibility
    useEffect(() => {
        if (!disableScrollLock) {
            if (open && modalNode && isOverflowing()) {
                setBodyOverflow(false);
            }

            return () => {
                if (manager.modals.length === 0) {
                    setBodyOverflow(true);
                }
            };
        }

        return undefined;
    }, [modalNode, open, disableScrollLock]);

    useEventListener('keydown', handleDocumentKeyDown);

    // Render

    const isDisabledFocusBounding = useCallback(() => {
        return disableFocusBounding || !isTopModal();
    }, [disableFocusBounding, isTopModal]);

    const childProps = useMemo(() => {
        if (hasTransition) {
            return {
                onEnter: handleEnter,
                onExited: handleExited
            };
        }

        return {};
    }, [hasTransition, handleEnter, handleExited]);

    if (!open && (!hasTransition || exited)) {
        return null;
    }

    return (
        <Portal onRendered={handlePortalRendered}>
            <div
                role="presentation"
                className={classNames('modal', className, {
                    'modal--hidden': !open && exited,
                    'modal--centered': centered,
                    'modal--overflow': overflow
                })}
                onClick={handleClick}
                ref={setModalNode}
                {...other}
            >
                {backdrop && (
                    <Backdrop
                        open={open}
                        transition={hasTransition}
                        className="modal__backdrop"
                        transitionProps={backdropTransitionProps}
                        ref={backdropRef}
                        onClick={handleBackdropClick}
                    />
                )}
                <FocusBounding disabled={isDisabledFocusBounding}>
                    {React.cloneElement(children, childProps)}
                </FocusBounding>
            </div>
        </Portal>
    );
});

const propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    centered: PropTypes.bool,
    backdrop: PropTypes.bool,
    overflow: PropTypes.bool,
    backdropTransitionProps: PropTypes.object,
    disableEscapeKeyDown: PropTypes.bool,
    disableBackdropClick: PropTypes.bool,
    disableFocusBounding: PropTypes.bool,
    disableRestoreFocus: PropTypes.bool,
    disableScrollLock: PropTypes.bool,
    onEscapeKeyDown: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
};

Modal.propTypes = propTypes;

export default Modal;
export { propTypes };
