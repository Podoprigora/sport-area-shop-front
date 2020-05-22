import React from 'react';
import PropTypes from 'prop-types';

import CheckboxBase from '@components/CheckboxBase';
import CheckBoxIcon from '@svg-icons/material/CheckBoxIcon';
import CheckBoxOutlineBlankIcon from '@svg-icons/material/CheckBoxOutlineBlankIcon';

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    return (
        <CheckboxBase
            type="checkbox"
            icon={<CheckBoxOutlineBlankIcon />}
            iconChecked={<CheckBoxIcon />}
            ref={ref}
            {...props}
        />
    );
});

export default React.memo(Checkbox);
