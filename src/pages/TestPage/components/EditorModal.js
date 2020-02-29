/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Modal from '@components/Modal';

let modals = 0;

const getOffset = () => {
    return Math.round(Math.random() * (10 + 1) - 10);
};

const EditorModal = (props) => {
    const { open, onOpen, onClose, ...other } = props;

    const [modalOpen, setModalOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const contentRef = useRef(null);
    const firstInputRef = useRef(null);

    const handleCloseBtnClick = useCallback(
        (ev) => {
            onClose();
        },
        [onClose]
    );

    const handleOpenModal = useCallback(() => {
        firstInputRef.current.focus();
    }, []);

    const handleCloseModal = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleOpenModalBtnClick = useCallback(() => {
        setModalOpen(true);
    }, []);

    const handleCloseRelatedModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    useEffect(() => {
        if (modals) {
            setOffset(getOffset());
        }
        modals += 1;

        return () => {
            modals -= 1;
        };
    }, []);

    return (
        <Modal open={open} onOpen={handleOpenModal} onClose={handleCloseModal} {...other}>
            <CSSTransition
                in={open}
                timeout={300}
                classNames="modal-animation"
                appear
                unmountOnExit
            >
                <div
                    role="presentation"
                    className="modal-content"
                    ref={contentRef}
                    style={{
                        ...(offset && {
                            marginTop: `${offset}rem`,
                            marginLeft: `${offset}rem`
                        })
                    }}
                >
                    <div>
                        <input type="text" ref={firstInputRef} />
                    </div>
                    <div>
                        <input type="email" />
                    </div>

                    <div>
                        <input type="number" />
                    </div>

                    <button type="button" onClick={handleCloseBtnClick}>
                        Close
                    </button>
                    <div style={{ padding: '1rem 0' }}>
                        <button type="button" onClick={handleOpenModalBtnClick}>
                            Open modal
                        </button>
                    </div>

                    <EditorModal open={modalOpen} centered onClose={handleCloseRelatedModal} />
                </div>
            </CSSTransition>
        </Modal>
    );
};

EditorModal.propTypes = {
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

export default EditorModal;
