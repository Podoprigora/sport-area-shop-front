import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Portal from '@components/Portal';
import usePopper from './usePopper';

const Popper = (props) => {
    const {
        children,
        anchorRef,
        open,
        placement,
        strategy,
        modifiers,
        transitionProps = null
    } = props;

    const { referenceRef, popperRef, popperState, popperInstance } = usePopper({
        placement,
        strategy,
        modifiers
    });
    const [exited, setExited] = useState(true);

    const handleTransitionEnter = useCallback(() => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback(() => {
        setExited(true);
    }, []);

    useEffect(() => {
        if (anchorRef.current) {
            referenceRef(anchorRef.current);
        }
    }, [anchorRef, referenceRef]);

    if (!open && exited) {
        return null;
    }

    return (
        <Portal>
            <div className="popper" ref={popperRef}>
                {transitionProps ? (
                    <CSSTransition
                        {...transitionProps}
                        in={open && !!popperInstance}
                        onEnter={handleTransitionEnter}
                        onExited={handleTransitionExited}
                    >
                        {children(popperState)}
                    </CSSTransition>
                ) : (
                    children(popperState)
                )}
            </div>
        </Portal>
    );
};

Popper.propTypes = {
    children: PropTypes.func.isRequired,
    anchorRef: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    placement: PropTypes.string,
    strategy: PropTypes.string,
    modifiers: PropTypes.array,
    transitionProps: PropTypes.exact({
        classNames: PropTypes.string.isRequired,
        timeout: PropTypes.number
    })
};

export default Popper;
