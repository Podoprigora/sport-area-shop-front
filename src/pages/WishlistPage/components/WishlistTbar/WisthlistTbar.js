import React from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import SortIcon from '@svg-icons/material/SortIcon';
import TrashIcon from '@svg-icons/feather/TrashIcon';
import CheckAllIcon from '@svg-icons/feather/CheckAllIcon';

const WisthlistTbar = (props) => {
    return (
        <div className="tbar">
            <Button plain centered icon={CheckAllIcon}>
                Select All
            </Button>
            <Button plain centered disabled icon={TrashIcon}>
                Delete
            </Button>

            <Button plain centered arrow icon={SortIcon} style={{ marginLeft: 'auto' }}>
                Sort by
            </Button>
        </div>
    );
};

WisthlistTbar.propTypes = {};

export default WisthlistTbar;
