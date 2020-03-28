import { useState, useRef, useEffect, useCallback } from 'react';
import { createPopper } from '@popperjs/core';

const defaultModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 8]
        }
    }
];

const usePopper = (props) => {
    const { placement = 'bottom', strategy = 'fixed', modifiers = [] } = props;

    const [referenceNode, setReferenceNode] = useState(null);
    const [popperNode, setPopperNode] = useState(null);
    const [popperOptions] = useState(() => {
        return {
            placement,
            strategy,
            modifiers: [...defaultModifiers, ...modifiers]
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
        if (!referenceNode || !popperNode) {
            return undefined;
        }

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
    }, [referenceNode, popperNode, popperOptions]);

    return {
        referenceRef,
        popperRef,
        popperState,
        popperInstance: popperInstance.current
    };
};

export default usePopper;
