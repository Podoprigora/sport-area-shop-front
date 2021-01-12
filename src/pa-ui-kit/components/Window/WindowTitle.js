import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Heading from '@ui/Heading';

const WindowTitle = (props) => {
    const { children, className, fullWidth, ...other } = props;

    return (
        <Heading
            size="5"
            gutterBottom={false}
            className={classNames('window__header-title', className, {
                'window__header-title--fullwidth': fullWidth
            })}
            {...other}
        >
            {children}
        </Heading>
    );
};

WindowTitle.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool
};

export default WindowTitle;
