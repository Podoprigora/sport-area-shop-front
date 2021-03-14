import React, { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

const style: React.CSSProperties = {
    position: 'absolute',
    top: '-100000px',
    width: '100px',
    height: '100px',
    overflow: 'scroll'
};

export interface ScrollbarSizeProps {
    onChange?(height?: number): void;
}

export const ScrollbarSize = (props: ScrollbarSizeProps) => {
    const { onChange } = props;

    const nodeRef = useRef<HTMLDivElement>(null);
    const scrollbarHeight = useRef<number>();

    const setMeasurement = () => {
        if (nodeRef.current) {
            scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
        }
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const prevHeight = scrollbarHeight.current;

            setMeasurement();

            if (prevHeight !== scrollbarHeight.current && onChange) {
                onChange(scrollbarHeight.current);
            }
        }, 166);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [onChange]);

    useEffect(() => {
        setMeasurement();

        if (onChange) {
            onChange(scrollbarHeight.current);
        }
    }, [onChange]);

    return <div style={style} ref={nodeRef} />;
};
