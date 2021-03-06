import { isEmptyString } from './isEmptyString';

export const isEmptyValue = <T = unknown>(value: T): boolean => {
    if (typeof value === 'string') {
        return isEmptyString(value);
    }

    if (value instanceof Array) {
        return value.length !== 0;
    }

    return !!value;
};
