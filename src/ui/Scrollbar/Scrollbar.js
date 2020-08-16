import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

import setRef from '@ui/utils/setRef';
import useEventCallback from '@ui/hooks/useEventCallback';

const Scrollbar = React.forwardRef(function Scrollbar(props, ref) {
    const {
        children,
        disabled,
        enableVerticalTrack,
        enableHorizontalTrack,
        onScroll,
        ...other
    } = props;

    const handleRef = useEventCallback((node) => {
        if (ref) {
            setRef(ref, (node && node.view) || null);
        }
    });

    const renderTrackVertical = useEventCallback((renderProps) => {
        return !disabled ? (
            <div
                {...renderProps}
                className="custom-scrollbars-track custom-scrollbars-track--vertical"
            />
        ) : (
            <div />
        );
    });

    const renderTrackHorizontal = useEventCallback((renderProps) => {
        return !disabled ? (
            <div
                {...renderProps}
                className="custom-scrollbars-track custom-scrollbars-track--horizontal"
            />
        ) : (
            <div />
        );
    });

    const renderThumb = useEventCallback((renderProps) => {
        return !disabled ? <div {...renderProps} className="custom-scrollbars-thumb" /> : <div />;
    });

    return (
        <Scrollbars
            {...(enableVerticalTrack && { renderTrackVertical })}
            {...(enableHorizontalTrack && { renderTrackHorizontal })}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
            onScroll={onScroll}
            ref={handleRef}
            {...other}
        >
            {children}
        </Scrollbars>
    );
});

Scrollbar.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    enableVerticalTrack: PropTypes.bool,
    enableHorizontalTrack: PropTypes.bool,
    onScroll: PropTypes.func
};

Scrollbar.defaultProps = {
    onScroll: () => {}
};

export default Scrollbar;
