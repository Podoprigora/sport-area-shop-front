import React from 'react';
import PropTypes from 'prop-types';

import Mask, { MaskProgress } from '@ui/Mask';
import LinearProgress from '@ui/LinearProgress';
import CircularProgress from '@ui/CircularProgress';

const WindowLoadingMask = (props) => {
    const {
        open,
        primary = true,
        position: positionProp,
        variant = 'linear',
        progressProps
    } = props;

    const defaultPosition = variant === 'linear' ? 'top' : 'center';
    const position = positionProp || defaultPosition;

    const progressComponents = {
        linear: <LinearProgress />,
        circular: <CircularProgress />,
        _default: <LinearProgress />
    };

    const currentProgressComponent = React.cloneElement(
        progressComponents[variant] || progressComponents['_default'],
        {
            ...progressProps
        }
    );

    return (
        <Mask open={open}>
            <MaskProgress position={position} primary={primary}>
                {currentProgressComponent}
            </MaskProgress>
        </Mask>
    );
};

WindowLoadingMask.propTypes = {
    open: PropTypes.bool,
    primary: PropTypes.bool,
    position: PropTypes.string,
    variant: PropTypes.oneOf(['linear', 'circular']),
    progressProps: PropTypes.object
};

export default WindowLoadingMask;
