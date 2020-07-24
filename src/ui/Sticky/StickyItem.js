import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Scrollbar from '@ui/Scrollbar';
import { useSticky } from './StickyContext';

const defaultStyle = {
    width: 'inherit',
    overflow: 'hidden'
};

const StickyItem = (props) => {
    const {
        children,
        style,
        scrollbar = true,
        scrollbarProps = {},
        minHeight = 300,
        ...other
    } = props;

    const { stickyStyle, setMinHeight } = useSticky();

    useEffect(() => {
        if (minHeight) {
            setMinHeight(minHeight);
        }
    }, [minHeight, setMinHeight]);

    const mergedStyles = { ...stickyStyle, ...defaultStyle, ...style };

    return (
        <div style={mergedStyles} {...other}>
            {scrollbar ? <Scrollbar {...scrollbarProps}>{children}</Scrollbar> : children}
        </div>
    );
};

StickyItem.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    scrollbar: PropTypes.bool,
    scrollbarProps: PropTypes.object,
    minHeight: PropTypes.number
};

export default StickyItem;
