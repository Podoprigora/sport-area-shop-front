import React, { useCallback, memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Window, { WindowHeader, WindowTitle, WindowBody, WindowActions } from '@ui/Window';
import IconButton from '@ui/IconButton';
import ChevronLeftIcon from '@ui/svg-icons/feather/ChevronLeftIcon';
import ClearCloseIcon from '@ui/svg-icons/material/ClearCloseIcon';
import Button from '@ui/Button';
import useEventCallback from '@ui/hooks/useEventCallback';

const CatalogFiltersMobileWindow = (props) => {
    const {
        children,
        open,
        disableAcceptButton,
        disableResetAllButton,
        onClose,
        onResetAll,
        onAccept
    } = props;

    const [displayChildren, setDisplayChildren] = useState(false);

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    const handleResetAll = useEventCallback((ev) => {
        if (onResetAll) {
            onResetAll(ev);
        }
    });

    const handleAccept = useEventCallback((ev) => {
        if (onAccept) {
            onAccept(ev);
        }
    });

    const handleEntered = useEventCallback(() => {
        setDisplayChildren(true);
    });

    const handleExit = useEventCallback(() => {
        setDisplayChildren(false);
    });

    return (
        <Window
            open={open}
            draggable={false}
            fullScreen
            onClose={handleClose}
            transitionProps={{
                onEntered: handleEntered,
                onExit: handleExit
            }}
        >
            <WindowHeader>
                <IconButton onClick={handleClose}>
                    <ChevronLeftIcon />
                </IconButton>
                <WindowTitle>Filters</WindowTitle>
                <IconButton onClick={handleClose}>
                    <ClearCloseIcon />
                </IconButton>
            </WindowHeader>
            <WindowBody>{displayChildren && children}</WindowBody>
            <WindowActions justify="stretch">
                <Button
                    plain
                    centered
                    size="large"
                    disabled={disableResetAllButton}
                    onClick={handleResetAll}
                >
                    Reset All
                </Button>
                <Button
                    primary
                    plain
                    centered
                    size="large"
                    disabled={disableAcceptButton}
                    onClick={handleAccept}
                >
                    Accept
                </Button>
            </WindowActions>
        </Window>
    );
};

CatalogFiltersMobileWindow.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    disableResetAllButton: PropTypes.bool,
    disableAcceptButton: PropTypes.bool,
    onClose: PropTypes.func,
    onResetAll: PropTypes.func,
    onAccept: PropTypes.func
};

export default memo(CatalogFiltersMobileWindow);
