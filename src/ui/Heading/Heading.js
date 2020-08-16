import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Heading = (props) => {
    const { size = 5, children, className, gutterBottom = true, upperCase, ...other } = props;

    return React.createElement(
        `h${size}`,
        {
            className: classNames(
                'heading',
                `heading--size-${size}`,
                {
                    'heading--no-gutter-bottom': !gutterBottom,
                    'heading--uppercase': upperCase
                },
                className
            ),
            ...other
        },
        children
    );
};

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    gutterBottom: PropTypes.bool,
    upperCase: PropTypes.bool
};

export default Heading;
