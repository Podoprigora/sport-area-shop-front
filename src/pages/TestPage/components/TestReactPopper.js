import React, { useState, useEffefct, useCallback, useRef } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import Button from '@components/Button';
import Portal from '@components/Portal';

const containerStyle = {
    display: 'flex',
    flexFlow: 'row nowrap'
};

const TestReactPopper = () => {
    const [open, setOpen] = useState(false);
    const [exited, setExited] = useState(true);

    const handleBtnClick = useCallback((ev) => {
        setOpen((state) => !state);
    }, []);

    const handleTransitionEnter = useCallback(() => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback(() => {
        setExited(true);
    }, []);

    return (
        <div style={containerStyle}>
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <Button primary ref={ref} onClick={handleBtnClick}>
                            Popper
                        </Button>
                    )}
                </Reference>
                <Portal>
                    <CSSTransition
                        in={open}
                        classNames="tooltip"
                        timeout={300}
                        appear
                        unmountOnExit
                        onEnter={handleTransitionEnter}
                        onExited={handleTransitionExited}
                    >
                        <Popper placement="bottom">
                            {({ ref, style, placement }) => {
                                return (
                                    <div
                                        ref={ref}
                                        style={style}
                                        data-placement={placement}
                                        className={classNames('tooltip', {
                                            // [`tooltip--${placement}`]: placement
                                        })}
                                    >
                                        Popper content
                                    </div>
                                );
                            }}
                        </Popper>
                    </CSSTransition>
                </Portal>
            </Manager>
        </div>
    );
};

export default TestReactPopper;
