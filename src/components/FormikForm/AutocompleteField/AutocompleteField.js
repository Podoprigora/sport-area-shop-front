import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';

import useEventCallback from '@components/hooks/useEventCallback';
import Autocomplete from '@components/Autocomplete';
import FieldControl from '@components/FieldControl';

const AutocompleteField = React.forwardRef(function AutocompleteField(props, ref) {
    const { name, onChange, inputName, onInputChange, ...other } = props;
    const { setFieldValue, getFieldProps } = useFormikContext();
    const { value: inputValue } = getFieldProps(inputName);
    const [field, meta, helpers] = useField(props);
    const { error, touched } = meta;

    const handleInputChange = useEventCallback((ev) => {
        if (inputName) {
            setFieldValue(inputName, ev.target.value);
        }

        if (onInputChange) {
            onInputChange(ev);
        }
    });

    const handleChange = useEventCallback((ev) => {
        helpers.setValue(ev.target.value);

        if (onChange) {
            onChange(ev);
        }
    });

    const fieldProps = {
        ...field,
        ...other,
        ...helpers,
        error,
        touched,
        inputValue,
        onChage: handleChange,
        onInputChange: handleInputChange
    };

    return <FieldControl {...fieldProps} ref={ref} component={Autocomplete} />;
});

AutocompleteField.propTypes = {
    name: PropTypes.string.isRequired,
    inputName: PropTypes.string,
    onChange: PropTypes.func,
    onInputChange: PropTypes.func
};

export default AutocompleteField;
