import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useControlled from '@ui/hooks/useControlled';
import { StickyContext } from './StickyContext';

const defaultStyle = {};

const StickyContainer = (props) => {
    const { children, minHeight: minHeightDefaultProp = 300, ...other } = props;

    const nodeRef = useRef(null);
    const [style, setStyle] = useState(defaultStyle);
    const [minHeight, setMinHeight] = useControlled(null, minHeightDefaultProp);

    const handleDocumentScroll = useCallback(() => {
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
        document.addEventListener('scroll', handleDocumentScroll, false);
        document.addEventListener('resize', handleDocumentScroll, false);

        return () => {
            document.removeEventListener('scroll', handleDocumentScroll, false);
            document.removeEventListener('resize', handleDocumentScroll, false);
        };
    }, [handleDocumentScroll]);

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
