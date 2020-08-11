import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useScreenMask from '@contexts/ScreenMaskContext';
import Mask, { MaskProgress } from '@ui/Mask';
import LinearProgress from '@ui/LinearProgress';

const ScreenMask = (props) => {
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
