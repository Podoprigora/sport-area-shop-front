import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Window, { WindowActions, WindowBody, WindowHeader } from '@ui/Window';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';
import Button from '@ui/Button';
import ProductCommentEditorForm from './ProductCommentEditorForm';

const windowName = 'ProductCommentEditorWindow';

const ProductCommentEditorWindow = (props) => {
    const formikRef = useRef(null);
    const { isOpenWindow, getWindowParams, closeWindow } = useWindowManager();

    const handleClose = useEventCallback((ev) => {
        closeWindow(windowName);
    });

    const handleSave = useEventCallback(() => {
        if (formikRef.current && formikRef.current.handleSubmit) {
            formikRef.current.handleSubmit();
        }
    });

    const handleFormSubmit = useEventCallback((values, actions) => {
        console.log(values);
        closeWindow(windowName);
    });

    const open = isOpenWindow(windowName);

    return (
        <Window open={open} centered maxWidth={540} onClose={handleClose}>
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
