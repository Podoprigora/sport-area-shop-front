import React from 'react';
import IconButton from '@components/IconButton';

const InputIconButton = React.forwardRef(function InputIconButton(props, ref) {
    return <IconButton className="input__btn-icon" size="small" ref={ref} {...props} />;
});

export default InputIconButton;
