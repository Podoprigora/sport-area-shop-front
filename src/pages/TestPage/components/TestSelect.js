import React from 'react';

import Input, { InputIconButton } from '@components/Input';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import SelectInput from '@components/SelectInput';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';

const TestSelect = () => {
    return (
        <div>
            <div className="u-flex u-flex-align-items-flex-start u-margin-b-6">
                <SelectInput className="u-margin-r-8" placeholder="Select Item" />
                <Input
                    placeholder="Enter text"
                    appendAdornment={(inputProps) => <SearchIcon size="medium" />}
                />
            </div>
            <div className="u-margin-b-6">
                <Input
                    placeholder="Enter text"
                    appendAdornment={(inputProps) => (
                        <>
                            <SearchIcon size="medium" />
                        </>
                    )}
                />
            </div>
            <div>
                <Input />
            </div>
        </div>
    );
};

export default TestSelect;
