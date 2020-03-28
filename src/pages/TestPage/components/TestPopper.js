import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPopper } from '@popperjs/core';
import { CSSTransition } from 'react-transition-group';
import Button from '@components/Button';
import Popper from '@components/Popper';
import Portal from '@components/Portal';

const TestPopper = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleButtonClick = useCallback((ev) => {
        setShowTooltip((state) => {
            return !state;
        });
    }, []);

    return (
        <Popper placement="bottom">
            {({ referenceRef, popperRef, instance }) => {
                return (
                    <>
                        <Button
                            primary
                            ref={referenceRef}
                            style={{ marginLeft: '10rem' }}
                            onClick={handleButtonClick}
                        >
                            Test usePopper
                        </Button>
                        <Portal>
                            <CSSTransition
                                in={showTooltip}
                                timeout={200}
                                classNames="tooltip"
                                unmountOnExit
                            >
                                <div className="popper" ref={popperRef}>
                                    <div className="tooltip">Tooltip content</div>
                                </div>
                            </CSSTransition>
                        </Portal>
                    </>
                );
            }}
        </Popper>
    );
};

export default TestPopper;
