import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Button from '@components/Button';
import Window from '@components/Window';

const TestWindow = (props) => {
    const [openWindow, setOpenWindow] = useState(false);

    const handleOpenWindowBtnClick = useCallback((ev) => {
        setOpenWindow(true);
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
                onClose={handleCloseWindow}
                centered
                style={{ width: '100%', maxWidth: '80rem', minHeight: '40rem', margin: '1rem' }}
            >
                test window
                <div style={{ padding: '5rem' }}>
                    <Button centered plain autoFocus onClick={handleCloseWindow}>
                        Close
                    </Button>
                </div>
            </Window>
        </div>
    );
};

export default TestWindow;
