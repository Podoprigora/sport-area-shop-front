import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useEventCallback, useMergedRefs, getTouchPosition } from '../utils';

export interface ImageEasyZoomProps extends React.ComponentPropsWithRef<'span'> {
    /**
     * Normally contains of `img` component that should be zooming in.
     */
    children?: React.ReactElement;
}

export const ImageEasyZoom = React.forwardRef<HTMLSpanElement, ImageEasyZoomProps>(
    function ImageEasyZoom(props, forwardeRef) {
        const { children, className, style, ...other } = props;

        const [styleState, setStyleState] = useState<React.CSSProperties>();
        const [imageStyleState, setImageStyleState] = useState<React.CSSProperties>();
        const [zoom, setZoom] = useState(false);

        const nodeRef = useRef<HTMLSpanElement>(null);
        const handleRef = useMergedRefs(nodeRef, forwardeRef);
        const imageRef = useRef<HTMLImageElement>(null);

        const touchPositionIdRef = useRef<number>();
        const hadTouchMoveRecentlyCountRef = useRef<number>(0);

        const updateStyle = () => {
            if (imageRef.current) {
                const { width, height } = imageRef.current.getBoundingClientRect();

                setStyleState({ width, height });
            }
        };

        const updateImageStyle = (touchPostion: ReturnType<typeof getTouchPosition>) => {
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

        const zoomIn = (ev: MouseEvent | TouchEvent) => {
            updateStyle();

            const touchPosition = getTouchPosition(ev, touchPositionIdRef);
            updateImageStyle(touchPosition);

            setZoom(true);
        };

        const zoomOut = () => {
            setImageStyleState(undefined);
            setStyleState(undefined);
            setZoom(false);
        };

        const handlePointerMove = useEventCallback((ev: TouchEvent | MouseEvent) => {
            if (zoom) {
                const touchPostion = getTouchPosition(ev, touchPositionIdRef);
                updateImageStyle(touchPostion);
            }
        });

        const handleMouseDown = useEventCallback((ev: React.MouseEvent) => {
            ev.preventDefault();
        });

        const handleMouseUp = useEventCallback((ev: MouseEvent) => {
            ev.preventDefault();

            if (!zoom) {
                zoomIn(ev);
            } else {
                zoomOut();
            }
        });

        const handleMouseLeave = useEventCallback(() => {
            if (zoom) {
                zoomOut();
            }
        });

        const handleTouchMove = useEventCallback((ev: TouchEvent) => {
            handlePointerMove(ev);
            hadTouchMoveRecentlyCountRef.current += 1;
        });

        const handleTouchAway = useEventCallback((ev: TouchEvent) => {
            if (zoom && nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
                zoomOut();
            }
        });

        const handleTouchEnd = useEventCallback((ev: TouchEvent) => {
            if (!zoom) {
                zoomIn(ev);
            } else if (hadTouchMoveRecentlyCountRef.current < 10) {
                zoomOut();
            }

            touchPositionIdRef.current = undefined;
            hadTouchMoveRecentlyCountRef.current = 0;

            const element = nodeRef.current;

            if (element) {
                element.removeEventListener('touchend', handleTouchEnd);
                element.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchAway);
            }
        });

        const handleTouchStart = useEventCallback((ev: TouchEvent) => {
            ev.preventDefault();

            const touchItem = ev.changedTouches[0];

            if (touchItem) {
                touchPositionIdRef.current = touchItem.identifier;
            }

            const element = nodeRef.current;

            if (element) {
                element.addEventListener('touchend', handleTouchEnd);
                element.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchAway);
            }
        });

        // Effects

        useEffect(() => {
            if (nodeRef.current) {
                const element = nodeRef.current;

                element.addEventListener('touchstart', handleTouchStart, {
                    passive: false
                });

                return () => {
                    element.removeEventListener('touchstart', handleTouchStart);
                    element.removeEventListener('touchend', handleTouchEnd);
                    element.removeEventListener('touchmove', handleTouchMove);
                    document.addEventListener('touchend', handleTouchAway);
                };
            }

            return undefined;
        }, [handleTouchEnd, handleTouchMove, handleTouchStart, handleTouchAway]);

        // Render

        if (!React.isValidElement(children)) {
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
    }
);
