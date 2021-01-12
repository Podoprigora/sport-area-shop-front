import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useControlled from '@ui/hooks/useControlled';
import { StickyContext } from './StickyContext';

const defaultStyle = {};

const supportResizeObserver = !!window.ResizeObserver;

const StickyContainer = (props) => {
    const { children, minHeight: minHeightDefaultProp = 300, ...other } = props;

    const nodeRef = useRef(null);
    const [style, setStyle] = useState(defaultStyle);
    const [minHeight, setMinHeight] = useControlled(null, minHeightDefaultProp);

    const handleUpdateStyle = useCallback(() => {
        const { top, bottom } = nodeRef.current.getBoundingClientRect();
        const documentHeight = document.documentElement.clientHeight;

        if (top <= 0 && bottom > minHeight) {
            setStyle({
                position: 'fixed',
                top: 0,
                bottom: 0,
                ...(bottom <= documentHeight && { height: bottom })
            });
        } else {
            setStyle(defaultStyle);
        }
    }, [minHeight]);

    useEffect(() => {
        document.addEventListener('scroll', handleUpdateStyle, false);

        if (!supportResizeObserver) {
            document.addEventListener('resize', handleUpdateStyle, false);
        }

        return () => {
            document.removeEventListener('scroll', handleUpdateStyle, false);

            if (!supportResizeObserver) {
                document.removeEventListener('resize', handleUpdateStyle, false);
            }
        };
    }, [handleUpdateStyle]);

    useEffect(() => {
        const roCallback = (entries) => {
            handleUpdateStyle();
        };

        if (nodeRef.current && supportResizeObserver) {
            const ro = new ResizeObserver(roCallback);

            ro.observe(nodeRef.current);

            return () => {
                ro.disconnect();
            };
        }

        return undefined;
    }, [handleUpdateStyle]);

    const contextValue = useMemo(
        () => ({
            stickyStyle: style,
            setMinHeight
        }),
        [setMinHeight, style]
    );

    return (
        <div {...other} ref={nodeRef}>
            <StickyContext.Provider value={contextValue}>{children}</StickyContext.Provider>
        </div>
    );
};

StickyContainer.propTypes = {
    children: PropTypes.node,
    minHeight: PropTypes.number
};

export default StickyContainer;
