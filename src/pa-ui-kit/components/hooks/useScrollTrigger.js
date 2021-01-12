import { useState, useCallback, useEffect, useRef } from 'react';

const defaultTarget = typeof window !== 'undefined' ? window : null;

export default function useScrollTrigger(params) {
    const { disableReverseScroll = false, target = defaultTarget, threshold = 200 } = params;

    const [trigger, setTrigger] = useState(false);
    const currentPositionRef = useRef(null);

    const handleScroll = useCallback(() => {
        const prevPosition = currentPositionRef.current;

        if (target) {
            currentPositionRef.current = target.pageYOffset;
        }

        if (
            disableReverseScroll &&
            prevPosition !== null &&
            currentPositionRef.current < prevPosition
        ) {
            setTrigger(false);
        } else if (currentPositionRef.current > threshold) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [target, threshold, disableReverseScroll]);

    useEffect(() => {
        handleScroll();

        target.addEventListener('scroll', handleScroll);

        return () => {
            target.removeEventListener('scroll', handleScroll);
        };
    }, [target, handleScroll]);

    return trigger;
}
