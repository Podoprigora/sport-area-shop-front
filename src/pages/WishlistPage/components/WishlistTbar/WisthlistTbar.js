import React from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import SortIcon from '@svg-icons/material/SortIcon';
import TrashIcon from '@svg-icons/feather/TrashIcon';
import CheckAllIcon from '@svg-icons/feather/CheckAllIcon';
import Hidden from '@ui/Hidden';
import Tooltip from '@ui/Tooltip';

const WisthlistTbar = (props) => {
    return (
        <div className="tbar">
            <Hidden smDown>
                <Button plain centered icon={CheckAllIcon}>
                    Select All
                </Button>
            </Hidden>
            <Hidden smUp>
                <Button plain centered icon={CheckAllIcon} />
            </Hidden>

            <Hidden smDown>
                <Button plain centered disabled icon={TrashIcon}>
                    Delete
                </Button>
            </Hidden>
            <Hidden smUp>
                <Button plain centered disabled icon={TrashIcon} />
            </Hidden>

            <Button plain centered arrow icon={SortIcon} style={{ marginLeft: 'auto' }}>
                Sort by
            </Button>
        </div>
    );
};

WisthlistTbar.propTypes = {};

export default WisthlistTbar;
