import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { Carousel } from '@ui/Carousel';
import AdwSliderSkeleton from '../Skeletons/AdwSliderSkeleton';

const AdwSlider = ({ data, className, loading }) => {
    const [style, setStyle] = useState({ minHeight: '10rem' });
    const elRef = useRef(null);

    const updateStyle = useCallback(() => {
        if (elRef.current) {
            const ratio = 1 / 3.2;
            const width = elRef.current.clientWidth;
            const minHeight = Math.ceil(width * ratio);

            setStyle({ minHeight });
        }
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
    }, [updateStyle, handleWindowResize, loading]);

    if (loading) {
        return <AdwSliderSkeleton />;
    }

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <Carousel
            autoPlay
            interval={10000}
            control="hover"
            className={className}
            style={style}
            ref={elRef}
        >
            {data.map(({ id, image }, i) => (
                <img key={id} src={image} alt="" />
            ))}
        </Carousel>
    );
};

AdwSlider.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired
        })
    ),
    className: PropTypes.string,
    loading: PropTypes.bool
};

export default AdwSlider;
