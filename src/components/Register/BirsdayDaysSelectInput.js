import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import SelectField from '@ui/FormikForm/SelectField';
import { MenuItem } from '@ui/Menu';

const days = Array.from(Array(31)).map((_, index) => {
    const day = index + 1;
    return String(day).padStart(2, '0');
});

const BirsdayDaysSelectInput = (props) => {
    const renderItem = useMemo(() => {
        return (item) => {
            return <MenuItem>{item}</MenuItem>;
        };
    }, []);

    return (
        <SelectField
            name="birthdayDay"
            placeholder="Day"
            emptyItem
            fullWidth
            data={days}
            renderItem={renderItem}
        />
    );
};

export default memo(BirsdayDaysSelectInput);
