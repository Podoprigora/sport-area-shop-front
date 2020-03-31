import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Popper from '@components/Popper';
import useForkRef from '@components/hooks/useForkRef';

const Tooltip = (props) => {
    const {
        children,
        title,
        placement = 'bottom',
        className,
        disableFocusListener,
        enterDelay = 166,
        leaveDelay = 0
    } = props;

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const mouseEnterTimer = useRef(null);
    const mouseLeaveTimer = useRef(null);

    const handleAnchorRefs = useForkRef(anchorRef, children.ref);

    const handleMouseEnter = useCallback(
        (ev) => {
            clearTimeout(mouseLeaveTimer.current);

            mouseEnterTimer.current = setTimeout(() => {
                setOpen(true);
            }, enterDelay);
        },
        [enterDelay]
    );

    const handleMouseLeave = useCallback(
        (ev) => {
            clearTimeout(mouseEnterTimer.current);

            mouseLeaveTimer.current = setTimeout(() => {
                setOpen(false);
            }, leaveDelay);
        },
        [leaveDelay]
    );

    const handleFocus = useCallback((ev) => {
        setOpen(true);
    }, []);

    const handleBlur = useCallback((ev) => {
        setOpen(false);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(mouseEnterTimer.current);
            clearTimeout(mouseLeaveTimer.current);
        };
    }, []);

    return (
        <>
            {React.cloneElement(children, {
                ref: handleAnchorRefs,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                ...(!disableFocusListener && {
                    onFocus: handleFocus,
                    onBlur: handleBlur
                })
            })}
            {!!title && (
                <Popper
                    open={open}
                    placement={placement}
                    anchorRef={anchorRef}
                    transitionProps={{ classNames: 'tooltip', timeout: 300 }}
                >
                    {({ placement: currentPlacement }) => (
                        <div
                            className={classNames(
                                'tooltip',
                                `u-placement-${currentPlacement}`,
                                className
                            )}
                        >
                            {title}
                        </div>
                    )}
                </Popper>
            )}
        </>
    );
};

Tooltip.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    placement: PropTypes.string,
    className: PropTypes.string,
    disableFocusListener: PropTypes.bool,
    enterDelay: PropTypes.number,
    leaveDelay: PropTypes.number
};

export default Tooltip;
