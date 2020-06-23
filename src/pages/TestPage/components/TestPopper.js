import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import Button from '@ui/Button';
import Portal from '@ui/Portal';
import usePopper from '@ui/Popper/usePopper';
import Popper from '@ui/Popper';

const TestPopper = () => {
    const [open, setOpen] = useState(false);
    // const [exited, setExited] = useState(true);
    // const { referenceRef, popperRef, popperState, popperInstance } = usePopper({
    //     placement: 'bottom'
    // });

    const anchorRef = useRef(null);
    const mouseEnterTimer = useRef(null);
    const mouseLeaveTimer = useRef(null);

    const handleFocus = useCallback((ev) => {
        setOpen(true);
    }, []);

    const handleBlur = useCallback((ev) => {
        setOpen(false);
    }, []);

    const handleMouseEnter = useCallback((ev) => {
        clearTimeout(mouseLeaveTimer.current);

        mouseEnterTimer.current = setTimeout(() => {
            setOpen(true);
        }, 166);
    }, []);

    const handleMouseLeave = useCallback((ev) => {
        clearTimeout(mouseEnterTimer.current);

        mouseLeaveTimer.current = setTimeout(() => {
            setOpen(false);
        }, 166);
    }, []);

    // const handleTransitionEnter = useCallback(() => {
    //     setExited(false);
    // }, []);

    // const handleTransitionExited = useCallback(() => {
    //     setExited(true);
    // }, []);

    useEffect(() => {
        return () => {
            clearTimeout(mouseEnterTimer.current);
            clearTimeout(mouseLeaveTimer.current);
        };
    }, []);

    return (
        <>
            <Button
                primary
                ref={anchorRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                Show tooltip
            </Button>
            <Popper
                open={open}
                anchorRef={anchorRef}
                placement="bottom-start"
                transitionProps={{ timeout: 300, classNames: 'tooltip' }}
            >
                {({ placement }) => {
                    return (
                        <div role="tooltip" className={`tooltip u-placement-${placement}`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eveniet
                            nihil reiciendis odit, amet optio totam at quis quae possimus laboriosam
                            sint placeat debitis, atque cupiditate cumque pariatur culpa ea?
                        </div>
                    );
                }}
            </Popper>
        </>
    );

    // return (
    //     <>
    //         <Button
    //             primary
    //             ref={referenceRef}
    //             onMouseEnter={handleMouseEnter}
    //             onMouseLeave={handleMouseLeave}
    //             onFocus={handleFocus}
    //             onBlur={handleBlur}
    //         >
    //             Show tooltip
    //         </Button>

    //         {(open || !exited) && (
    //             <Portal>
    //                 <div className="popper" ref={popperRef}>
    //                     <CSSTransition
    //                         in={open && !!popperInstance}
    //                         timeout={300}
    //                         classNames="tooltip"
    //                         onEnter={handleTransitionEnter}
    //                         onExited={handleTransitionExited}
    //                     >
    //                         <div
    //                             role="tooltip"
    //                             className={`tooltip tooltip--${popperState.placement}`}
    //                         >
    //                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
    //                             eveniet nihil reiciendis odit, amet optio totam at quis quae
    //                             possimus laboriosam sint placeat debitis, atque cupiditate cumque
    //                             pariatur culpa ea?
    //                         </div>
    //                     </CSSTransition>
    //                 </div>
    //             </Portal>
    //         )}
    //     </>
    // );
};

export default TestPopper;
