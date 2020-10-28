import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Window, { WindowActions, WindowBody, WindowHeader, WindowLoadingMask } from '@ui/Window';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';
import Button from '@ui/Button';
import { useProductPageActions } from '@pages/ProductPage/context';
import useMountedRef from '@ui/hooks/useMountedRef';
import useNotification from '@ui/Notification';

import ProductCommentEditorForm from './ProductCommentEditorForm';

const windowName = 'ProductCommentEditorWindow';

const ProductCommentEditorWindow = (props) => {
    const { asyncSaveProductComment } = useProductPageActions();
    const { isOpenWindow, getWindowParams, closeWindow } = useWindowManager();
    const { showAlert } = useNotification();

    const [loading, setLoading] = useState(false);
    const formikRef = useRef(null);
    const isMoutedRef = useMountedRef();

    const handleClose = useEventCallback((ev) => {
        if (!loading) {
            closeWindow(windowName);
        }
    });

    const handleSave = useEventCallback(() => {
        if (formikRef.current?.handleSubmit) {
            formikRef.current.handleSubmit();
        }
    });

    const handleFormSubmit = useCallback(
        async (values, actions) => {
            if (asyncSaveProductComment) {
                try {
                    setLoading(true);

                    await asyncSaveProductComment(values);

                    closeWindow(windowName);
                    showAlert({
                        type: 'success',
                        message: "Thank's for your comment!",
                        frame: true,
                        autoClose: true
                    });
                } catch (e) {
                    console.error(e);
                } finally {
                    if (isMoutedRef.current) {
                        setLoading(false);
                    }
                }
            }
        },
        [asyncSaveProductComment, closeWindow, showAlert, isMoutedRef]
    );

    const open = isOpenWindow(windowName);

    return (
        <Window open={open} centered maxWidth={540} onClose={handleClose}>
            <WindowLoadingMask open={loading} />
            <WindowHeader title="New Comment" onClose={handleClose} />
            <WindowBody painted>
                <ProductCommentEditorForm ref={formikRef} onSubmit={handleFormSubmit} />
            </WindowBody>
            <WindowActions>
                <Button transparent centered onClick={handleClose}>
                    Cancel
                </Button>
                <Button plain primary centered onClick={handleSave}>
                    Save
                </Button>
            </WindowActions>
        </Window>
    );
};

ProductCommentEditorWindow.propTypes = {};

export default ProductCommentEditorWindow;
