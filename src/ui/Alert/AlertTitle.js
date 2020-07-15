import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Heading from '@ui/Heading';

const AlertTitle = (props) => {
    const { className, ...other } = props;

    return <Heading className={classNames('alert__title', className)} {...other} />;
};

AlertTitle.propTypes = {
    className: PropTypes.string
};

export { AlertTitle };
