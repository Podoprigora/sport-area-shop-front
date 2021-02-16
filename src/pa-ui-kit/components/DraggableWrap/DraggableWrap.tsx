import React from 'react';
import Draggable from 'react-draggable';

export interface DraggableWrapProps extends React.ComponentProps<typeof Draggable> {
    children?: React.ReactElement;
    disabled?: boolean;
}

export const DraggableWrap = (props: DraggableWrapProps) => {
    const { children, disabled, ...other } = props;

    if (disabled) {
        return children || null;
    }

    return (
        <Draggable handle=".react-draggable__handle" bounds="body" {...other}>
            {children}
        </Draggable>
    );
};
