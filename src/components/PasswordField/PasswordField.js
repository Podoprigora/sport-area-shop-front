import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import InputField from '@ui/FormikForm/InputField';
import { InputIconButton } from '@ui/Input';
import EyeIcon from '@svg-icons/feather/EyeIcon';
import EyeOffIcon from '@svg-icons/feather/EyeOffIcon';

const PasswordField = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = useCallback((ev) => {
        setPasswordVisible((prevState) => !prevState);
    }, []);

    console.log('rerender');

    return (
        <InputField
            type={passwordVisible ? 'text' : 'password'}
            {...props}
            appendAdornment={() => {
                return (
                    <InputIconButton onClick={handlePasswordVisibility}>
                        {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                    </InputIconButton>
                );
            }}
        />
    );
};

export default memo(PasswordField);
