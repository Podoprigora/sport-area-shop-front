import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from '@components/Portal';
import Backdrop from '@components/Backdrop';
import useEventCallback from '@components/hooks/useEventCallback';
import setRef from '@components/utils/setRef';

const getHasTransition = (props) => {
    return props.children && props.children.props.hasOwnProperty('in');
};

const Modal = React.forwardRef(function Modal(props, ref) {
    const { children, open, className, center, backdrop = true, onClose, onOpen, ...other } = props;

    const [exited, setExited] = useState(true);
    const [modalNode, setModalNode] = useState(null);
    const backdropRef = useRef(null);
    const hasTransition = getHasTransition(props);

    const handleOpen = useEventCallback(() => {
        if (onOpen) {
            onOpen();
        }
    });

    const handleClose = useEventCallback(() => {
        if (onClose) {
            onClose();
        }
    });

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

            if (ev.code === 'Escape') {
                handleClose();
            }
        },
        [handleClose]
    );

    const handleClick = useCallback(
        (ev) => {
            if (!backdrop && modalNode && modalNode.isEqualNode(ev.target)) {
                handleClose();
            }
        },
        [backdrop, modalNode, handleClose]
    );

    const handleBackdropClick = useCallback(
        (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            if (backdropRef.current && backdropRef.current.isEqualNode(ev.target)) {
                handleClose();
            }
        },
        [handleClose]
    );

    const handlePortalRendered = useCallback(() => {
        handleOpen();
    }, [handleOpen]);

    useEffect(() => {
        if (open && modalNode) {
            setRef(ref, modalNode);
        }

        return () => {
            setRef(ref, null);
        };
    }, [open, modalNode, ref]);

    useEffect(() => {
        return () => {
            handleClose();
        };
    }, [handleClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleDocumentKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleDocumentKeyDown, false);
        };
    }, [handleDocumentKeyDown]);

    const childProps = {};

    if (hasTransition) {
        childProps.onEnter = handleEnter;
        childProps.onExited = handleExited;
    }

    if (!open && (!hasTransition || exited)) {
        return null;
    }

    return (
        <Portal onRendered={handlePortalRendered}>
            <div
                role="presentation"
                className={classNames('modal', className, {
                    'modal--hidden': !open && exited,
                    'modal--center': center
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
                {React.cloneElement(children, childProps)}
            </div>
        </Portal>
    );
});

Modal.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    center: PropTypes.bool,
    backdrop: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
};

export default Modal;
