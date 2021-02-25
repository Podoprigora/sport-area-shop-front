type Handler = ((...args: any[]) => void) | undefined;

export function composeEventHandlers<T extends Handler>(...handlers: T[]) {
    return (...args: any[]) => {
        handlers.forEach((handler) => {
            if (handler) {
                handler(...args);
            }
        });
    };
}
