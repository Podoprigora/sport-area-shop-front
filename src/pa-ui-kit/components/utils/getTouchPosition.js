export default function getTouchPosition(ev, touchIdRef) {
    if (touchIdRef && touchIdRef.current !== undefined && ev.changedTouches) {
        for (let i = 0; i <= ev.changedTouches.length; i += 1) {
            const touchItem = ev.changedTouches[i];

            if (touchItem && touchIdRef.current === touchItem.identifier) {
                return {
                    x: touchItem.clientX,
                    y: touchItem.clientY
                };
            }
        }

        return null;
    }

    return {
        x: ev.clientX,
        y: ev.clientY
    };
}
