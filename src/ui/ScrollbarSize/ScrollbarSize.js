import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

const style = {
    position: 'absolute',
    top: '-100000px',
    width: '100px',
    height: '100px',
    overflow: 'scroll'
};

const ScrollbarSize = ({ onChange }) => {
    const node = useRef(null);
    const scrollbarHeight = useRef(null);

    const setMeasurement = () => {
        scrollbarHeight.current = node.current.offsetHeight - node.current.clientHeight;
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const prevHeight = scrollbarHeight.current;
            setMeasurement();

            if (prevHeight !== scrollbarHeight.current) {
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
        onChange(scrollbarHeight.current);
    }, [onChange]);

    return <div style={style} ref={node} />;
};

ScrollbarSize.propTypes = {
    onChange: PropTypes.func
};

ScrollbarSize.defaultProps = {
    onChange: () => {}
};

export default ScrollbarSize;
