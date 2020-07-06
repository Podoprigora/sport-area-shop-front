import { useState, useRef, useEffect, useCallback } from 'react';
import { createPopper } from '@popperjs/core';

const defaultModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 2]
        }
    }
];

const usePopper = (props = {}) => {
    const { placement = 'bottom', strategy = 'fixed', modifiers = [] } = props;

    const [referenceNode, setReferenceNode] = useState(null);
    const [popperNode, setPopperNode] = useState(null);
    const [popperOptions] = useState(() => {
        return {
            placement,
            strategy,
            modifiers: modifiers.length > 0 ? modifiers : defaultModifiers
        };
    });

    const [popperState, setPopperState] = useState({});
    const popperInstance = useRef(null);

    const referenceRef = useCallback((el) => {
        setReferenceNode(el);
    }, []);

    const popperRef = useCallback((el) => {
        setPopperNode(el);
    }, []);

    useEffect(() => {
        if (referenceNode && popperNode) {
            popperInstance.current = createPopper(referenceNode, popperNode, {
                ...popperOptions,
                onFirstUpdate: (state) => {
                    setPopperState(state);
                }
            });

            return () => {
                popperInstance.current.destroy();
                popperInstance.current = null;
            };
        }

        return undefined;
    }, [referenceNode, popperNode, popperOptions]);

    return {
        referenceRef,
        popperRef,
        popperState,
        popperInstance: popperInstance.current
    };
};

export default usePopper;
