import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from '@ui/Heading';

const PageTitle = (props) => {
    const { children, ...other } = props;

    return (
        <Heading size="3" gutterBottom={false} {...other}>
            {children}
        </Heading>
    );
};

PageTitle.propTypes = {
    children: PropTypes.string
};

export default PageTitle;
