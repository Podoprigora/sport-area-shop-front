import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import Window, { WindowHeader, WindowBody, WindowTitle } from '@ui/Window';
import IconButton from '@ui/IconButton';
import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';

const MobileCategoryMenuWindow = (props) => {
    const { open, children, onClose, onBack, ...other } = props;

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    const handleBack = useEventCallback((ev) => {
        if (onBack) {
            onBack(ev);
        }
    });

    return (
        <Window open={open} draggable={false} fullScreen onClose={handleClose}>
            <WindowHeader>
                <IconButton onClick={handleBack}>
                    <ChevronLeftIcon />
                </IconButton>
                <WindowTitle>Shop by category</WindowTitle>
                <IconButton onClick={handleClose}>
                    <ClearCloseIcon />
                </IconButton>
            </WindowHeader>
            <WindowBody className="mobile-category-menu">{children}</WindowBody>
        </Window>
    );
};

MobileCategoryMenuWindow.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    onClose: PropTypes.func,
    onBack: PropTypes.func
};

export default MobileCategoryMenuWindow;
