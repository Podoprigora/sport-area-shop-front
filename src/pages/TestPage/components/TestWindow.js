import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import Button from '@ui/Button';
import Window from '@ui/Window';
import Tooltip from '@ui/Tooltip';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import WindowActions from '@ui/Window/WindowActions';
import ShoppingBasketIcon from '@svg-icons/material/ShoppingBasketIcon';

const TestWindow = (props) => {
    const [openWindow, setOpenWindow] = useState(false);
    const btnRef = useRef(null);

    const handleOpenWindowBtnClick = useCallback((ev) => {
        setOpenWindow(true);
    }, []);

    const handleOpenWindow = useCallback(() => {
        if (btnRef.current) {
            btnRef.current.focus();
        }
    }, []);

    const handleCloseWindow = useCallback(() => {
        setOpenWindow(false);
    }, []);

    return (
        <div>
            <Button primary onClick={handleOpenWindowBtnClick}>
                Open window
            </Button>

            <Window
                open={openWindow}
                maxWidth={600}
                centered
                onOpen={handleOpenWindow}
                onClose={handleCloseWindow}
            >
                <WindowHeader title="Test window" onClose={handleCloseWindow} />
                <WindowBody style={{ height: '20rem' }}>
                    <div style={{ padding: '1rem 0' }}>Window content</div>
                    <Tooltip title="Window Tooltip">
                        <Button>Show tooltip</Button>
                    </Tooltip>
                </WindowBody>

                <WindowActions align="right">
                    <Tooltip title="Save" disableFocusListener>
                        <Button primary plain centered ref={btnRef}>
                            OK
                        </Button>
                    </Tooltip>
                    <Button centered plain autoFocus onClick={handleCloseWindow}>
                        Close
                    </Button>
                </WindowActions>
            </Window>
        </div>
    );
};

export default TestWindow;
