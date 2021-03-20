import React, { useState, useCallback, memo } from 'react';

import { InputField } from '@ui/FormikForm/InputField';
import { InputIconButton } from '@ui/Input';
import { EyeIcon, EyeOffIcon } from '@ui/svg-icons/feather';

const PasswordField = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = useCallback(() => {
        setPasswordVisible((prevState) => !prevState);
    }, []);

    return (
        <InputField
            {...props}
            type={passwordVisible ? 'text' : 'password'}
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
