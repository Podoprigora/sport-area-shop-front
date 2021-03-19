import { useState, useCallback, useEffect, useRef } from 'react';

export type UseScrollTriggerProps = {
    disableReverseScroll?: boolean;
    target?: Window;
    threshold?: number;
};

const target = typeof window !== 'undefined' ? window : null;

export function useScrollTrigger(params: UseScrollTriggerProps = {}) {
    const { disableReverseScroll = false, threshold = 200 } = params;

    const [trigger, setTrigger] = useState(false);
    const currentPositionRef = useRef<number>(0);

    const handleScroll = useCallback(() => {
        const prevPosition = currentPositionRef.current;

        if (target) {
            currentPositionRef.current = target.pageYOffset;
        }

        if (disableReverseScroll && prevPosition > 0 && currentPositionRef.current < prevPosition) {
            setTrigger(false);
        } else if (currentPositionRef.current > threshold) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [threshold, disableReverseScroll]);

    useEffect(() => {
        handleScroll();

        if (target) {
            target.addEventListener('scroll', handleScroll);

            return () => {
                target.removeEventListener('scroll', handleScroll);
            };
        }

        return undefined;
    }, [handleScroll]);

    return trigger;
}
