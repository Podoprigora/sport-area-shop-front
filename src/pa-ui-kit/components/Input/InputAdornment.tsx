import React, { useCallback } from 'react';
import classNames from 'classnames';

export interface InputAdornmentProps {
    children?: React.ReactNode;
    start?: boolean;
    end?: boolean;
}

export const InputAdornment = (props: InputAdornmentProps) => {
    const { children, start, end } = props;

    // Handlers

    const handleMouseDown = useCallback((ev: React.SyntheticEvent) => {
        ev.preventDefault();
    }, []);

    // Render

    let content = children;

    if (typeof children === 'string') {
        content = <div className="input__adornment-text">{children}</div>;
    }

    if (!React.isValidElement(content)) {
        return null;
    }

    return (
        <div
            role="presentation"
            className={classNames('input__adornment', {
                'input__adornment--start': start,
                'input__adornment--end': end
            })}
            onMouseDown={handleMouseDown}
        >
            {content}
        </div>
    );
};
