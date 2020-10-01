import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';
import getTouchPosition from '@ui/utils/getTouchPosition';

const ImageEasyZoom = React.forwardRef(function ImageEasyZoom(props, ref) {
    const { children, className, style, ...other } = props;

    const [styleState, setStyleState] = useState(null);
    const [imageStyleState, setImageStyleState] = useState(null);
    const [zoom, setZoom] = useState(false);

    const nodeRef = useRef(null);
    const handleRef = useForkRef(nodeRef, ref);
    const imageRef = useRef(null);

    const touchPositionIdRef = useRef(null);
    const hadTouchMoveRecentlyRef = useRef(false);

    const updateStyle = () => {
        if (imageRef.current) {
            const { width, height } = imageRef.current.getBoundingClientRect();

            setStyleState({ width, height });
        }
    };

    const updateImageStyle = (touchPostion) => {
        if (nodeRef.current && touchPostion) {
            const { top, left, width, height } = nodeRef.current.getBoundingClientRect();
            const { x, y } = touchPostion;

            const offsetX = x - left;
            const offsetY = y - top;
            const relativeOffsetX = (offsetX / width) * 100;
            const relativeOffsetY = (offsetY / height) * 100;

            setImageStyleState({
                transform: `translate3d(-${relativeOffsetX}%, -${relativeOffsetY}%, 0)`,
                top: `${relativeOffsetY}%`,
                left: `${relativeOffsetX}%`
            });
        }
    };

    const zoomIn = (ev) => {
        updateStyle();

        const touchPosition = getTouchPosition(ev, touchPositionIdRef);
        updateImageStyle(touchPosition);

        setZoom(true);
    };

    const zoomOut = () => {
        setImageStyleState(null);
        setStyleState(null);
        setZoom(false);
    };

    const handlePointerMove = useEventCallback((ev) => {
        if (zoom) {
            const touchPostion = getTouchPosition(ev, touchPositionIdRef);
            updateImageStyle(touchPostion);
        }
    });

    const handleMouseDown = useEventCallback((ev) => {
        ev.preventDefault();
    });

    const handleMouseUp = useEventCallback((ev) => {
        ev.preventDefault();

        if (!zoom) {
            zoomIn(ev);
        } else {
            zoomOut();
        }
    });

    const handleMouseLeave = useEventCallback((ev) => {
        if (zoom) {
            zoomOut();
        }
    });

    const handleTouchStart = useEventCallback((ev) => {
        ev.preventDefault();

        const touchItem = ev.changedTouches[0];

        if (touchItem) {
            touchPositionIdRef.current = touchItem.identifier;
        }
    });

    const handleTouchEnd = useEventCallback((ev) => {
        if (!zoom) {
            zoomIn(ev);
        } else if (!hadTouchMoveRecentlyRef.current) {
            zoomOut();
        }

        touchPositionIdRef.current = null;
        hadTouchMoveRecentlyRef.current = false;
    });

    const handleTouchMove = useEventCallback((ev) => {
        handlePointerMove(ev);
        hadTouchMoveRecentlyRef.current = true;
    });

    const handleTouchAway = useEventCallback((ev) => {
        if (zoom && nodeRef.current && !nodeRef.current.contains(ev.target)) {
            zoomOut();
        }
    });

    // Effects

    useEffect(() => {
        if (nodeRef.current) {
            const element = nodeRef.current;

            element.addEventListener('touchstart', handleTouchStart, {
                passive: false
            });

            element.addEventListener('touchend', handleTouchEnd, {
                passive: false
            });

            element.addEventListener('touchmove', handleTouchMove, {
                passive: false
            });

            document.addEventListener('touchend', handleTouchAway, false);

            return () => {
                element.removeEventListener('touchstart', handleTouchStart, { passive: false });
                element.removeEventListener('touchend', handleTouchEnd, { passive: false });
                element.removeEventListener('touchmove', handleTouchMove, { passive: false });
                document.addEventListener('touchend', handleTouchAway, false);
            };
        }

        return undefined;
    }, [handleTouchEnd, handleTouchMove, handleTouchStart, handleTouchAway]);

    // Render

    if (!children || React.Children.count(children) !== 1) {
        return null;
    }

    const imageElement = React.cloneElement(children, {
        style: { ...children.props.style, ...imageStyleState },
        ref: imageRef
    });

    return (
        <span
            role="presentation"
            className={classNames('image-easy-zoom', className, {
                'image-easy-zoom--zoom-in': zoom
            })}
            style={{ ...style, ...styleState }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handlePointerMove}
            onMouseLeave={handleMouseLeave}
            ref={handleRef}
            {...other}
        >
            {imageElement}
        </span>
    );
});

ImageEasyZoom.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object
};

export default ImageEasyZoom;
