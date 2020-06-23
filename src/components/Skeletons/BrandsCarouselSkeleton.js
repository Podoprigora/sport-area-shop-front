import React, { useEffect, useState, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';

import Skeleton from '@ui/Skeleton';

const BrandsCarouselSkeleton = () => {
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const [itemsLength, setItemsLength] = useState(0);

    const calcLength = useCallback(() => {
        const containerWidth = containerRef.current.clientWidth;
        const itemWidth = itemRef.current.clientWidth;

        const length = Math.round(Math.floor(containerWidth / itemWidth) / 2.5);

        setItemsLength(length);
    }, []);

    const handleWindowResize = useCallback(
        debounce(() => {
            calcLength();
        }, 166),
        []
    );

    useEffect(() => {
        calcLength();
        window.addEventListener('resize', handleWindowResize, false);

        return () => {
            window.removeEventListener('resize', handleWindowResize, false);
        };
    }, [handleWindowResize, calcLength]);

    return (
        <div className="carousel-skeleton" ref={containerRef}>
            <Skeleton type="circle" ref={itemRef} />
            {itemsLength > 1 &&
                [...Array(itemsLength - 1)].map((item, index) => {
                    return <Skeleton key={index} type="circle" />;
                })}
        </div>
    );
};

export default BrandsCarouselSkeleton;
