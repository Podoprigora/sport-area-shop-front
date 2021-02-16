import React from 'react';

import { Mask, MaskProgress, MaskProps, MaskProgressProps } from '../Mask';
import { LinearProgress, LinearProgressProps } from '../LinearProgress';
import { CircularProgress, CircularProgressProps } from '../CircularProgress';

type ExtendedProps = Omit<MaskProps, 'fixed' | 'children'> & Omit<MaskProgressProps, 'children'>;

export interface WindowLoadingMaskProps extends ExtendedProps {
    variant?: 'linear' | 'circular';
    progressProps?: CircularProgressProps & LinearProgressProps;
}

export const WindowLoadingMask = (props: WindowLoadingMaskProps) => {
    const {
        open,
        variant = 'linear',
        primary = true,
        secondary,
        position: positionProp,
        title,
        progressProps,
        ...other
    } = props;

    const defaultPosition = variant === 'linear' ? 'top' : 'center';
    const position = positionProp || defaultPosition;

    const progressComponents = {
        linear: <LinearProgress />,
        circular: <CircularProgress />,
        _default: <LinearProgress />
    };

    const currentProgressComponent = React.cloneElement(
        progressComponents[variant] || progressComponents._default,
        {
            ...progressProps
        }
    );

    return (
        <Mask open={open} {...other}>
            <MaskProgress position={position} primary={primary} secondary={secondary} title={title}>
                {currentProgressComponent}
            </MaskProgress>
        </Mask>
    );
};
