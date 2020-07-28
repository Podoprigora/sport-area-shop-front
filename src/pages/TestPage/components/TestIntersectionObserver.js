/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState, useCallback } from 'react';

import ImagePlaceholder from '@resources/images/image-placeholder.svg';
import data from '@remote/json/products.json';

const viewPortStyle = {
    width: '80rem',
    height: '60rem',
    margin: '0 auto',
    overflow: 'auto',
    border: '1px solid green'
};

const viewPortBodyStyle = {
    minHeight: '150rem'
};

const targetStyle = {
    padding: '4rem',
    backgroundColor: 'orange',
    marginTop: '65rem'
};

const imageContainerStyle = {
    display: 'flex',
    margin: '2rem auto',
    width: '20rem',
    minHeight: '30rem',
    backgroundColor: '#fff'
};

const imageStyle = {
    display: 'block',
    width: '100%'
};

const imagePlacehoderStyle = {
    display: 'block',
    width: '100%'
};

const LazyImage = (props) => {
    const { image, name, viewportRef } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const nodeRef = useRef(null);
    const imageRef = useRef(null);

    // console.log(image);

    const handleLoad = (ev) => {
        // console.log('Load: ', ev);
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    };

    const handleError = (ev) => {
        // console.error('Error: ', ev);
    };

    const updateImage = useCallback(() => {
        if (imageRef.current) {
            const src = imageRef.current.dataset.src;

            if (src) {
                imageRef.current.src = src;
            }
        }
    }, []);

    useEffect(() => {
        const ioOptions = {
            root: viewportRef.current,
            rootMargin: '200px 0px'
        };

        const io = new IntersectionObserver(([entry], observer) => {
            const { isIntersecting, target } = entry;

            if (isIntersecting) {
                updateImage();
                observer.unobserve(target);
            }
        }, ioOptions);

        io.observe(nodeRef.current);

        return () => {
            io.disconnect();
        };
    }, [viewportRef, updateImage]);

    return (
        <div style={imageContainerStyle} ref={nodeRef}>
            {!isLoaded && <img src={ImagePlaceholder} alt="" style={imagePlacehoderStyle} />}
            <img
                data-src={image}
                alt={name}
                ref={imageRef}
                style={{ ...imageStyle, display: isLoaded ? 'block' : 'none' }}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};

const TestIntersectionObserver = (props) => {
    const viewportRef = useRef(null);

    // useEffect(() => {
    //     const ioOptions = {
    //         root: viewPortRef.current,
    //         threshold: 0,
    //         rootMargin: '0px'
    //     };
    //     const io = new IntersectionObserver(([entry], observer) => {
    //         const { isIntersecting, target } = entry;

    //         if (isIntersecting) {
    //             console.log(entry);
    //             observer.unobserve(target);
    //         }
    //     }, ioOptions);

    //     io.observe(targetRef.current);

    //     return () => {
    //         io.disconnect();
    //     };
    // }, []);

    return (
        <div style={viewPortStyle} ref={viewportRef}>
            <div style={viewPortBodyStyle}>
                {data.map((item, index) => {
                    return <LazyImage key={item.id} {...item} viewportRef={viewportRef} />;
                })}
            </div>
        </div>
    );
};

export default TestIntersectionObserver;
