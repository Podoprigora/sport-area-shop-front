import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SelectField from '@ui/FormikForm/SelectField';
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

export default BirsdayMonthsSelectInput;
