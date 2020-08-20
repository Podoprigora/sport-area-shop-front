import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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

    const [popperInstance, setPopperInstance] = useState(null);

    const referenceRef = useCallback((el) => {
        setReferenceNode(el);
    }, []);

    const popperRef = useCallback((el) => {
        setPopperNode(el);
    }, []);

    useEffect(() => {
        if (referenceNode && popperNode) {
            const instance = createPopper(referenceNode, popperNode, {
                ...popperOptions,
                onFirstUpdate: () => {
                    setPopperInstance(instance);
                }
            });

            return () => {
                instance.destroy();
                setPopperInstance(null);
            };
        }

        return undefined;
    }, [referenceNode, popperNode, popperOptions]);

    return useMemo(() => {
        return {
            referenceRef,
            popperRef,
            popperInstance
        };
    }, [popperRef, referenceRef, popperInstance]);
};

export default usePopper;
