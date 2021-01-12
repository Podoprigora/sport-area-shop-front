import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useForkRef from '@ui/hooks/useForkRef';

const supportedIntersectionObserver = !!window.IntersectionObserver;

const LazyImage = React.forwardRef(function LazyImage(props, ref) {
    const { src, alt = '', placehoder = null, className, containerProps, ...other } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const nodeRef = useRef(null);
    const imageRef = useRef(null);
    const handleImageRef = useForkRef(imageRef, ref);

    const handleImageLoad = (ev) => {
        setIsLoaded(true);
    };

    const updateImage = useCallback(() => {
        if (imageRef.current) {
            const imageSrc = imageRef.current.dataset.src;

            if (imageSrc) {
                imageRef.current.src = imageSrc;
            }
        }
    }, []);

    useEffect(() => {
        const ioOptions = {
            root: null,
            rootMargin: '200px 0px'
        };

        const ioCallback = ([entry], observer) => {
            const { isIntersecting, target } = entry;

            if (isIntersecting) {
                updateImage();
                observer.unobserve(target);
            }
        };

        if (nodeRef.current && supportedIntersectionObserver) {
            const io = new IntersectionObserver(ioCallback, ioOptions);

            io.observe(nodeRef.current);

            return () => {
                io.disconnect();
            };
        }

        return undefined;
    }, [updateImage]);

    return (
        <div {...containerProps} ref={nodeRef}>
            <img
                {...(supportedIntersectionObserver ? { 'data-src': src } : { src })}
                alt={alt}
                className={classNames(className, {
                    'u-display-none': !isLoaded
                })}
                onLoad={handleImageLoad}
                ref={handleImageRef}
                {...other}
            />
            {!isLoaded && placehoder}
        </div>
    );
});

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    placehoder: PropTypes.node,
    className: PropTypes.string,
    alt: PropTypes.string,
    containerProps: PropTypes.object
};

export default LazyImage;
