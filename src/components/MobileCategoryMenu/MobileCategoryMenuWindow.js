import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useEventCallback } from '@ui/utils';
import { Window, WindowHeader, WindowBody, WindowTitle } from '@ui/Window';
import { IconButton } from '@ui/IconButton';
import { ChevronLeftIcon } from '@ui/svg-icons/feather';
import { ClearCloseIcon } from '@ui/svg-icons/material';

const MobileCategoryMenuWindow = (props) => {
    const { open, children, onClose, onBack } = props;
    const [displayChildren, setDisplayChildren] = useState(false);

    const handleClose = useEventCallback((ev) => {
        if (ev) {
            ev.preventDefault();
        }

        if (onClose) {
            onClose(ev);
        }
    });

    const handleBack = useEventCallback((ev) => {
        ev.preventDefault();

        if (onBack) {
            onBack(ev);
        }
    });

    const handleTransitionEntered = useEventCallback(() => {
        setDisplayChildren(true);
    });

    const handleTransitionExit = useEventCallback(() => {
        setDisplayChildren(false);
    });

    return (
        <Window
            open={open}
            draggable={false}
            backdrop={false}
            fullScreen
            transitionProps={{
                onEntered: handleTransitionEntered,
                onExit: handleTransitionExit
            }}
            onClose={handleClose}
        >
            <WindowHeader>
                <IconButton onClick={handleBack} onTouchEnd={handleBack}>
                    <ChevronLeftIcon />
                </IconButton>
                <WindowTitle>Shop by category</WindowTitle>
                <IconButton onClick={handleClose} onTouchEnd={handleClose}>
                    <ClearCloseIcon />
                </IconButton>
            </WindowHeader>
            <WindowBody className="mobile-category-menu">{displayChildren && children}</WindowBody>
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
