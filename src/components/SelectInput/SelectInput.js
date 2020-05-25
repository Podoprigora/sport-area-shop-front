import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useForkRef from '@components/hooks/useForkRef';
import isEmptyString from '@components/utils/isEmptyString';
import useControlled from '@components/hooks/useControlled';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';

const SelectInput = React.forwardRef(function SelectInput(props, ref) {
    const {
        id,
        name,
        defaultValue,
        value: propValue,
        placeholder,
        tabIndex = '0',
        className,
        children,
        disabled,
        readOnly,
        autoFocus,
        fullWidth,
        error,
        multiline = false,
        style,
        onBlur = () => {},
        onFocus = () => {},
        onChange = () => {},
        ...other
    } = props;

    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useControlled(propValue, defaultValue);

    const displayRef = useRef(null);
    const inputRef = useRef(null);
    const handleInputRef = useForkRef(inputRef, ref);
    const displayValueRef = useRef('');

    // Handlers

    const handleFocus = (ev) => {
        setFocused(true);

        onFocus(ev);
    };

    const handleBlur = (ev) => {
        setFocused(false);

        onBlur(ev);
    };

    // Render

    const ChevronIconComponent = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

    let displayContent = displayValueRef.current;

    if (!isEmptyString(placeholder)) {
        displayContent = <div className="select-input__placeholder">{placeholder}</div>;
    } else if (isEmptyString(displayContent)) {
        displayContent = <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
    }

    return (
        <div
            className={classNames('select-input input', className, {
                'select-input--multiline': multiline,
                'input--focused': focused,
                'input--disabled': disabled,
                'input--full-width': fullWidth,
                'input--error': error
            })}
            tabIndex={tabIndex}
            style={style}
            ref={displayRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <input type="hidden" ref={handleInputRef} {...{ value, disabled, readOnly }} />
            <div className="select-input__display">{displayContent}</div>
            <ChevronIconComponent className="select-input__chevron" />
        </div>
    );
});

SelectInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoFocus: PropTypes.bool,
    fullWidth: PropTypes.bool,
    error: PropTypes.bool,
    multiline: PropTypes.bool,
    style: PropTypes.object,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func
};

export default SelectInput;
