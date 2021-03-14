import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import { createCtx, useControlled, useMergedRefs } from '../utils';

export interface StickyContainerProps extends React.ComponentPropsWithRef<'div'> {
    children?: React.ReactNode;
    minHeight?: number;
}

type StickyContainerContextValue = {
    readonly stickyStyle: React.CSSProperties;
    setMinHeight(value: number | undefined): void;
};

const StickyContainerContext = createCtx<StickyContainerContextValue>();

export const useSticky = StickyContainerContext.useContext;

const defaultStyle = {};

// @ts-ignore
const supportResizeObserver = !!window.ResizeObserver;

export const StickyContainer = React.forwardRef<HTMLDivElement, StickyContainerProps>(
    function StickyContainer(props, forwardedRef) {
        const { children, minHeight: minHeightDefaultProp = 300, ...other } = props;

        const [style, setStyle] = useState<React.CSSProperties>(defaultStyle);
        const [minHeight, setMinHeight] = useControlled<number>(undefined, minHeightDefaultProp);
        const nodeRef = useRef<HTMLDivElement>(null);
        const handleRef = useMergedRefs(nodeRef, forwardedRef);

        const handleUpdateStyle = useCallback(() => {
            if (!nodeRef.current) {
                return;
            }

            const { top, bottom } = nodeRef.current.getBoundingClientRect();
            const documentHeight = document.documentElement.clientHeight;

            if (top <= 0 && bottom > (minHeight as number)) {
                setStyle({
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    ...(bottom <= documentHeight && { height: bottom })
                });
            } else {
                setStyle(defaultStyle);
            }
        }, [minHeight]);

        useEffect(() => {
            document.addEventListener('scroll', handleUpdateStyle, false);

            if (!supportResizeObserver) {
                document.addEventListener('resize', handleUpdateStyle, false);
            }

            return () => {
                document.removeEventListener('scroll', handleUpdateStyle, false);

                if (!supportResizeObserver) {
                    document.removeEventListener('resize', handleUpdateStyle, false);
                }
            };
        }, [handleUpdateStyle]);

        useEffect(() => {
            const roCallback = () => {
                handleUpdateStyle();
            };

            if (nodeRef.current && supportResizeObserver) {
                // @ts-ignore
                const ro = new ResizeObserver(roCallback);

                ro.observe(nodeRef.current);

                return () => {
                    ro.disconnect();
                };
            }

            return undefined;
        }, [handleUpdateStyle]);

        const contextValue = useMemo(
            () =>
                ({
                    stickyStyle: style,
                    setMinHeight
                } as const),
            [setMinHeight, style]
        );

        return (
            <div {...other} ref={handleRef}>
                <StickyContainerContext.Provider value={contextValue}>
                    {children}
                </StickyContainerContext.Provider>
            </div>
        );
    }
);
