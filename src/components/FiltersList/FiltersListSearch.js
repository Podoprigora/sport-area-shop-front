import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import Input, { InputIconButton } from '@ui/Input';
import ClearCloseIcon from '@ui/svg-icons/material/ClearCloseIcon';

const CatalogFiltersBrandsSearch = (props) => {
    const { onChange } = props;

    const [value, setValue] = useState('');

    const handleChange = useCallback(
        (newValue) => {
            setValue(newValue);

            if (onChange) {
                onChange(newValue);
            }
        },
        [onChange]
    );

    const handleInputChange = useCallback(
        (ev) => {
            handleChange(ev.target.value);
        },
        [handleChange]
    );

    const handleClear = useCallback(
        (ev) => {
            handleChange('');
        },
        [handleChange]
    );

    return (
        <div className="filters-list__search">
            <Input
                value={value}
                fullWidth
                placeholder="Search"
                onChange={handleInputChange}
                {...(value.length > 0 && {
                    appendAdornment: () => (
                        <InputIconButton onClick={handleClear}>
                            <ClearCloseIcon />
                        </InputIconButton>
                    )
                })}
            />
        </div>
    );
};

CatalogFiltersBrandsSearch.propTypes = {
    onChange: PropTypes.func
};

export default memo(CatalogFiltersBrandsSearch);
