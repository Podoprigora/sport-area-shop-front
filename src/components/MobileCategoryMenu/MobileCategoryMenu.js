import React from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';

import MobileCategoryMenuWindow from './MobileCategoryMenuWindow';

const MobileCategoryMenu = (props) => {
    const { open, onClose } = props;

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    const handleBack = useEventCallback((ev) => {
        handleClose(ev);
    });

    return (
        <MobileCategoryMenuWindow open={open} onClose={handleClose} onBack={handleBack}>
            MobileCategoryMenu
        </MobileCategoryMenuWindow>
    );
};

MobileCategoryMenu.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export default MobileCategoryMenu;
