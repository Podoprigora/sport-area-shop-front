import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Window, { WindowHeader, WindowTitle, WindowBody, WindowActions } from '@ui/Window';
import IconButton from '@ui/IconButton';
import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import Button from '@ui/Button';
import useEventCallback from '@ui/hooks/useEventCallback';

const CatalogFiltersMobileWindow = (props) => {
    const {
        children,
        open,
        disabledAcceptButton,
        disabledResetAllButton,
        onClose,
        onResetAll,
        onAccept
    } = props;

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

    return (
        <Window open={open} draggable={false} fullScreen onClose={handleClose}>
            <WindowHeader>
                <IconButton onClick={handleClose}>
                    <ChevronLeftIcon />
                </IconButton>
                <WindowTitle>Filters</WindowTitle>
                <IconButton onClick={handleClose}>
                    <ClearCloseIcon />
                </IconButton>
            </WindowHeader>
            <WindowBody>{children}</WindowBody>
            <WindowActions justify="stretch">
                <Button
                    plain
                    centered
                    size="large"
                    disabled={disabledResetAllButton}
                    onClick={handleResetAll}
                >
                    Reset All
                </Button>
                <Button
                    primary
                    plain
                    centered
                    size="large"
                    disabled={disabledAcceptButton}
                    onClick={handleAccept}
                >
                    Accept
                </Button>
            </WindowActions>
        </Window>
    );
};

CatalogFiltersMobileWindow.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    disabledResetAllButton: PropTypes.bool,
    disabledAcceptButton: PropTypes.bool,
    onClose: PropTypes.func,
    onResetAll: PropTypes.func,
    onAccept: PropTypes.func
};

export default CatalogFiltersMobileWindow;
