import React, { memo } from 'react';

import { Mask, MaskProgress } from '@ui/Mask';
import { LinearProgress } from '@ui/LinearProgress';
import useScreenMask from '@contexts/ScreenMaskContext';

const ScreenMask = () => {
    const { isMaskShown } = useScreenMask();

    return (
        <Mask open={isMaskShown} fixed>
            <MaskProgress position="top" primary>
                <LinearProgress />
            </MaskProgress>
        </Mask>
    );
};

export default memo(ScreenMask);
