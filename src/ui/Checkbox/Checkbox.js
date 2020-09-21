import React from 'react';
import PropTypes from 'prop-types';

import CheckboxBase from '@ui/CheckboxBase';
import CheckBoxIcon from '@svg-icons/material/CheckBoxIcon';
import CheckBoxOutlineBlankIcon from '@svg-icons/material/CheckBoxOutlineBlankIcon';
import SquareIcon from '@svg-icons/feather/SquareIcon';

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    return (
        <CheckboxBase
            type="checkbox"
            icon={<SquareIcon />}
            iconChecked={<CheckBoxIcon />}
            ref={ref}
            {...props}
        />
    );
});

export default React.memo(Checkbox);
