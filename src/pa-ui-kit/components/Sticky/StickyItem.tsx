import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Scrollbar, ScrollbarProps } from '../Scrollbar';

import { useSticky } from './StickyContainer';

export interface StickyItemProps extends React.ComponentPropsWithRef<'div'> {
    children?: React.ReactNode;
    /**
     * If `true` will apply `Scrollbar` component as wrapper component for children.
     */
    scrollbar?: boolean;
    scrollbarProps?: Omit<ScrollbarProps, 'ref'>;
    minHeight?: number;
}

const defaultStyle: React.CSSProperties = {
    width: 'inherit',
    overflow: 'hidden',
    height: '100%'
};

export const StickyItem = React.forwardRef<HTMLDivElement, StickyItemProps>(function StickyItem(
    props,
    forwardedRef
) {
    const {
        children,
        style,
        scrollbar = true,
        scrollbarProps = {},
        minHeight = 300,
        className,
        ...other
    } = props;

    const { stickyStyle = {}, setMinHeight } = useSticky();

    useEffect(() => {
        if (minHeight) {
            setMinHeight(minHeight);
        }
    }, [minHeight, setMinHeight]);

    const mergedStyles = { ...stickyStyle, ...defaultStyle, ...style };
    const isSticky = Object.keys(stickyStyle).length > 0;

    return (
        <div
            className={classNames(className, {
                ...(isSticky && className && { [`${className}--active`]: true })
            })}
            style={mergedStyles}
            {...other}
            ref={forwardedRef}
        >
            {scrollbar ? <Scrollbar {...scrollbarProps}>{children}</Scrollbar> : children}
        </div>
    );
});
