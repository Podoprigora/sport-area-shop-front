import React, { useState, useRef, useCallback } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CSSTransition } from 'react-transition-group';
import debounce from 'lodash/debounce';

import { Button } from '../components/Button';
import { Portal } from '../components/Portal';
import { useEventCallback } from '../components/utils';
import { Popper, PopperProps, usePopper, UsePopperProps } from '../components/Popper';

export default {
    title: 'PA-UI-KIT/Popper',
    component: Popper
} as Meta;

export const Default: Story<PopperProps> = (args) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const handleButtonClick = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    return (
        <div>
            <Button ref={anchorRef} onClick={handleButtonClick}>
                Show Popper
            </Button>
            <Popper open={open} anchorRef={anchorRef} {...args}>
                {() => {
                    return (
                        <div style={{ width: 300, background: '#dedede', padding: 10 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                    );
                }}
            </Popper>
        </div>
    );
};
Default.args = {
    placement: 'bottom-start'
} as PopperProps;
Default.parameters = {
    docs: {
        source: {
            code: `
export const Default: Story<PopperProps> = (args) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const handleButtonClick = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    return (
        <div>
            <Button ref={anchorRef} onClick={handleButtonClick}>
                Show Popper
            </Button>
            <Popper open={open} anchorRef={anchorRef} {...args}>
                {() => {
                    return (
                        <div style={{ width: 300, background: '#dedede', padding: 10 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                    );
                }}
            </Popper>
        </div>
    );
};
            `
        }
    }
};

export const UsePopperStory: Story<UsePopperProps> = (args) => {
    const [open, setOpen] = useState(false);
    const [exited, setExited] = useState(true);
    const { popperRef, referenceRef, popperInstance } = usePopper(args);

    const handleMouseEnter = useEventCallback(
        debounce(() => {
            setOpen(true);
        }, 600)
    );

    const handleMouseLeave = useEventCallback(
        debounce(() => {
            setOpen(false);
        }, 300)
    );

    const handleTransitionEnter = useCallback(() => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback(() => {
        setExited(true);
    }, []);

    // Render

    const popperPlacement = popperInstance ? popperInstance.state.placement : 'bottom';

    return (
        <>
            <Button
                ref={referenceRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Show Tooltip
            </Button>
            {(open || !exited) && (
                <Portal>
                    <div className="popper" ref={popperRef}>
                        <CSSTransition
                            in={open && !!popperInstance}
                            timeout={300}
                            classNames="tooltip"
                            onEnter={handleTransitionEnter}
                            onExited={handleTransitionExited}
                        >
                            <div
                                role="tooltip"
                                className={`tooltip u-placement-${popperPlacement}`}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                eveniet nihil reiciendis odit, amet optio totam at quis quae
                                possimus laboriosam sint placeat debitis, atque cupiditate cumque
                                pariatur culpa ea?
                            </div>
                        </CSSTransition>
                    </div>
                </Portal>
            )}
        </>
    );
};
UsePopperStory.storyName = 'usePopper';
UsePopperStory.args = { placement: 'right-start' } as UsePopperProps;
UsePopperStory.parameters = {
    docs: {
        source: {
            code: `
export const UsePopperStory: Story<UsePopperProps> = (args) => {
    const [open, setOpen] = useState(false);
    const [exited, setExited] = useState(true);
    const { popperRef, referenceRef, popperInstance } = usePopper(args);

    const handleMouseEnter = useEventCallback(
        debounce(() => {
            setOpen(true);
        }, 600)
    );

    const handleMouseLeave = useEventCallback(
        debounce(() => {
            setOpen(false);
        }, 300)
    );

    const handleTransitionEnter = useCallback(() => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback(() => {
        setExited(true);
    }, []);

    // Render

    const popperPlacement = popperInstance ? popperInstance.state.placement : 'bottom';

    return (
        <>
            <Button
                ref={referenceRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Show Tooltip
            </Button>
            {(open || !exited) && (
                <Portal>
                    <div className="popper" ref={popperRef}>
                        <CSSTransition
                            in={open && !!popperInstance}
                            timeout={300}
                            classNames="tooltip"
                            onEnter={handleTransitionEnter}
                            onExited={handleTransitionExited}
                        >
                            <div
                                role="tooltip"
                                className={\`tooltip u-placement-\${popperPlacement}\`}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                eveniet nihil reiciendis odit, amet optio totam at quis quae
                                possimus laboriosam sint placeat debitis, atque cupiditate cumque
                                pariatur culpa ea?
                            </div>
                        </CSSTransition>
                    </div>
                </Portal>
            )}
        </>
    );
};
            `
        }
    }
};
