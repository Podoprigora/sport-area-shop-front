import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Scrollbar from '@ui/Scrollbar';
import { useSticky } from './StickyContext';

const defaultStyle = {
    width: 'inherit',
    overflow: 'hidden'
};

const StickyItem = (props) => {
    const { children, style, overflow = true, minHeight = 300, ...other } = props;

    const { stickyStyle, setMinHeight } = useSticky();

    useEffect(() => {
        if (minHeight) {
            setMinHeight(minHeight);
        }
    }, [minHeight, setMinHeight]);

    const mergedStyles = { ...stickyStyle, ...defaultStyle, ...style };

    return (
        <div style={mergedStyles} {...other}>
            {overflow ? <Scrollbar>{children}</Scrollbar> : children}
        </div>
    );
};

StickyItem.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    overflow: PropTypes.bool,
    minHeight: PropTypes.number
};

export default StickyItem;
