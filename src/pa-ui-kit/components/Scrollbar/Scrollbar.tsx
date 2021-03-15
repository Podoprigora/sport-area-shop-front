import React from 'react';
import Scrollbars, { ScrollbarProps as CustomScrollbarProps } from 'react-custom-scrollbars';

import { setRef, useEventCallback } from '../utils';

export interface ScrollbarProps extends CustomScrollbarProps {
    children?: React.ReactNode;
    disabled?: boolean;
    enableVerticalTrack?: boolean;
    enableHorizontalTrack?: boolean;
}

export interface ScrollbarRef extends Scrollbars {
    view: HTMLElement;
}

export const Scrollbar = React.forwardRef<Scrollbars, ScrollbarProps>(function Scrollbar(
    props,
    forwardedRef
) {
    const {
        children,
        disabled,
        enableVerticalTrack,
        enableHorizontalTrack,
        onScroll,
        ...other
    } = props;

    const handleRef = useEventCallback((node: Scrollbars | null) => {
        if (forwardedRef) {
            setRef(forwardedRef, node || null);
        }
    });

    const handleScroll = useEventCallback((ev: React.UIEvent<HTMLElement>) => {
        ev.stopPropagation();

        if (onScroll) {
            onScroll(ev);
        }
    });

    const renderTrackVertical = useEventCallback(
        (renderProps: React.ComponentPropsWithoutRef<'div'>) => {
            return !disabled ? (
                <div
                    {...renderProps}
                    className="custom-scrollbars-track custom-scrollbars-track--vertical"
                />
            ) : (
                <div />
            );
        }
    );

    const renderTrackHorizontal = useEventCallback(
        (renderProps: React.ComponentPropsWithoutRef<'div'>) => {
            return !disabled ? (
                <div
                    {...renderProps}
                    className="custom-scrollbars-track custom-scrollbars-track--horizontal"
                />
            ) : (
                <div />
            );
        }
    );

    const renderThumb = useEventCallback((renderProps: React.ComponentPropsWithoutRef<'div'>) => {
        return !disabled ? <div {...renderProps} className="custom-scrollbars-thumb" /> : <div />;
    });

    return (
        <Scrollbars
            {...(enableVerticalTrack && { renderTrackVertical })}
            {...(enableHorizontalTrack && { renderTrackHorizontal })}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
            onScroll={handleScroll}
            ref={handleRef}
            {...other}
        >
            {children}
        </Scrollbars>
    );
});
