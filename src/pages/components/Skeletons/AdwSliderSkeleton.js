import React, { useRef, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import Skeleton from '@components/Skeleton';

const AdwSliderSkeleton = () => {
    const ratio = 1 / 3.5;
    const [style, setStyle] = useState({ height: '10rem' });
    const elRef = useRef(null);

    const updateStyle = useCallback(() => {
        const width = elRef.current.clientWidth;
        const height = Math.ceil(width * ratio);

        setStyle({ height });
    }, [ratio]);

    const handleWindowResize = useCallback(
        debounce(() => {
            updateStyle();
        }, 166),
        []
    );

    useEffect(() => {
        updateStyle();

        window.addEventListener('resize', handleWindowResize, false);

        return () => {
            window.removeEventListener('resize', handleWindowResize, false);
        };
    }, [updateStyle, handleWindowResize]);

    return <Skeleton type="rect" style={style} ref={elRef} />;
};

export default AdwSliderSkeleton;
