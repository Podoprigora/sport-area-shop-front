import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

const DraggableWrap = (props) => {
    const { children, disabled, ...other } = props;

    if (disabled) {
        return children;
    }

    return (
        <Draggable handle=".react-draggable__handle" bounds="body" {...other}>
            {children}
        </Draggable>
    );
};

DraggableWrap.propTypes = {
    children: PropTypes.element,
    disabled: PropTypes.bool
};

export default DraggableWrap;
