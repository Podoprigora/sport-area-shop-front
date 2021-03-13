import React from 'react';

export function getTouchPosition<
    T extends MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
>(ev: T, touchIdRef?: React.RefObject<number | undefined>) {
    const touchEvent = ev as TouchEvent;
    const changedTouches = touchEvent.changedTouches;

    if (touchIdRef && touchIdRef.current !== undefined && changedTouches) {
        for (let i = 0; i <= changedTouches.length; i += 1) {
            const touchItem = changedTouches[i];

            if (touchItem && touchIdRef.current === touchItem.identifier) {
                return {
                    x: touchItem.clientX,
                    y: touchItem.clientY
                } as const;
            }
        }

        return null;
    }

    const mouseEvent = ev as MouseEvent;

    return {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
    } as const;
}
