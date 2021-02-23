import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    createPopper,
    Instance as PopperInstance,
    Modifier as PopperModifer,
    Placement as PopperPlacement,
    PositioningStrategy as PopperPositioningStrategy
} from '@popperjs/core';

const defaultModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 2]
        }
    }
] as Partial<PopperModifer<unknown, unknown>>[];

export interface UsePopperProps {
    placement?: PopperPlacement;
    strategy?: PopperPositioningStrategy;
    modifiers?: PopperModifer<unknown, unknown>[];
}

export const usePopper = (props: UsePopperProps = {}) => {
    const { placement = 'bottom', strategy = 'fixed', modifiers = [] } = props;

    const [referenceNode, setReferenceNode] = useState<HTMLElement | null>(null);
    const [popperNode, setPopperNode] = useState<HTMLElement | null>(null);
    const [popperOptions] = useState(() => {
        return {
            placement,
            strategy,
            modifiers: modifiers.length > 0 ? modifiers : defaultModifiers
        };
    });

    const [popperInstance, setPopperInstance] = useState<PopperInstance | null>(null);

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
        } as const;
    }, [popperRef, referenceRef, popperInstance]);
};
