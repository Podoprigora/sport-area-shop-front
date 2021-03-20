import React, { useRef, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

import { Skeleton } from '@ui/Skeleton';

const AdwSliderSkeleton = () => {
    const [style, setStyle] = useState({ height: '10rem' });
    const elRef = useRef(null);

    const updateStyle = useCallback(() => {
        if (!elRef.current) {
            return;
        }

        const ratio = 1 / 3.5;
        const width = elRef.current.clientWidth;
        const height = Math.ceil(width * ratio);

        setStyle({ height });
    }, []);

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
