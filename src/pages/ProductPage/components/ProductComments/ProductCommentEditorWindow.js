import React, { useCallback, useRef, useState } from 'react';

import { useEventCallback, useMountedRef } from '@ui/utils';
import { Button } from '@ui/Button';
import { Window, WindowActions, WindowBody, WindowHeader, WindowLoadingMask } from '@ui/Window';
import { useWindowManager } from '@ui/WindowManager';
import { useNotification } from '@ui/Notification';
import { useProductPageActions } from '@pages/ProductPage/context';

import ProductCommentEditorForm from './ProductCommentEditorForm';

const windowName = 'ProductCommentEditorWindow';

const ProductCommentEditorWindow = () => {
    const { asyncSaveProductComment } = useProductPageActions();
    const { isOpenWindow, closeWindow } = useWindowManager();
    const { showAlert } = useNotification();

    const [loading, setLoading] = useState(false);
    const formikRef = useRef(null);
    const isMoutedRef = useMountedRef();

    const handleClose = useEventCallback(() => {
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
        async (values) => {
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
                    showAlert({
                        type: 'error',
                        message: "We can't save your comment, some server error occurred!",
                        frame: true
                    });
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

export default ProductCommentEditorWindow;
