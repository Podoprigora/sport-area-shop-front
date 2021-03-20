import React, { memo, useMemo } from 'react';

import { SelectField } from '@ui/FormikForm/SelectField';
import { MenuItem } from '@ui/Menu';

const months = [
    'Jun',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const BirsdayMonthsSelectInput = (props) => {
    const renderItem = useMemo(() => {
        return (item) => {
            return <MenuItem>{item}</MenuItem>;
        };
    }, []);

    return (
        <SelectField
            {...props}
            name="birthdayMonth"
            label="Birthday"
            labelAlign="top"
            placeholder="Month"
            emptyItem
            fullWidth
            data={months}
            renderItem={renderItem}
        />
    );
};

BirsdayMonthsSelectInput.propTypes = {};

export default memo(BirsdayMonthsSelectInput);
