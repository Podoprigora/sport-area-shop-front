import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ScreeMaskContext } from './ScreenMaskContext';

const ScreenMaskProvider = (props) => {
    const { children } = props;
    const [isMaskShown, setIsMaskShown] = useState(false);

    const toggleMask = useCallback((isShown) => {
        setIsMaskShown(isShown);
    }, []);

    const contextValue = useMemo(
        () => ({
            isMaskShown,
            toggleMask
        }),
        [toggleMask, isMaskShown]
    );

    return <ScreeMaskContext.Provider value={contextValue}>{children}</ScreeMaskContext.Provider>;
};

ScreenMaskProvider.propTypes = {
    children: PropTypes.node
};

export default ScreenMaskProvider;
