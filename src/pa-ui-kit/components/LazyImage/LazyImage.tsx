import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';

import { useMergedRefs } from '../utils';

export interface LazyImageProps extends React.ComponentPropsWithRef<'img'> {
    placeholderComponent?: React.ReactElement;
    containerProps?: React.ComponentPropsWithoutRef<'div'>;
}

const supportedIntersectionObserver = !!window.IntersectionObserver;

export const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(function LazyImage(
    props,
    ref
) {
    const { src, alt = '', placeholderComponent, className, containerProps, ...other } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const handleImageRef = useMergedRefs(imageRef, ref);

    const handleImageLoad = () => {
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
        } as IntersectionObserverInit;

        const ioCallback = (
            [entry]: IntersectionObserverEntry[],
            observer: IntersectionObserver
        ) => {
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
            {!isLoaded && placeholderComponent}
        </div>
    );
});
