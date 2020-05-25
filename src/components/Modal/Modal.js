import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from '@components/Portal';
import Backdrop from '@components/Backdrop';
import FocusBounding from '@components/FocusBounding';
import useEventCallback from '@components/hooks/useEventCallback';
import setRef from '@components/utils/setRef';
import useEventListener from '@components/hooks/useEventListener';
import ModalManager from './ModalManager';

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
        disableFocusBounding = false,
        disableBackdropClick = false,
        disableEscapeKeyDown = false,
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
        }

        return () => {
            setRef(ref, null);
        };
    }, [open, modalNode, ref]);

    useEffect(() => {
        if (open) {
            triggerRef.current = document.activeElement;
        } else if (!open && triggerRef.current) {
            triggerRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        if (modalNode) {
            manager.add(modalNode);

            return () => {
                manager.remove(modalNode);
            };
        }

        return undefined;
    }, [modalNode]);

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
                    'modal--centered': centered
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
    disableEscapeKeyDown: PropTypes.bool,
    disableBackdropClick: PropTypes.bool,
    disableFocusBounding: PropTypes.bool,
    onEscapeKeyDown: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
};

Modal.propTypes = propTypes;

export default Modal;
export { propTypes };
