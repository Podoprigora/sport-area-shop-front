import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventCallback from '@ui/hooks/useEventCallback';
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
        className,
        ...other
    } = props;

    const { stickyStyle = {}, setMinHeight } = useSticky();

    useEffect(() => {
        if (minHeight) {
            setMinHeight(minHeight);
        }
    }, [minHeight, setMinHeight]);

    const mergedStyles = { ...stickyStyle, ...defaultStyle, ...style };
    const isSticky = Object.keys(stickyStyle).length > 0;

    return (
        <div
            className={classNames(className, {
                ...(isSticky && className && { [`${className}--active`]: true })
            })}
            style={mergedStyles}
            {...other}
        >
            {scrollbar ? <Scrollbar {...scrollbarProps}>{children}</Scrollbar> : children}
        </div>
    );
};

StickyItem.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    scrollbar: PropTypes.bool,
    scrollbarProps: PropTypes.object,
    minHeight: PropTypes.number
};

export default StickyItem;
