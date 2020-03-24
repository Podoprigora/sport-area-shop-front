import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Heading = (props) => {
    const { size, children, className, gutterBottom, ...other } = props;

    return React.createElement(
        `h${size}`,
        {
            className: classNames(
                'heading',
                `heading--size-${size}`,
                {
                    'heading--no-gutter-bottom': !gutterBottom
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
    gutterBottom: PropTypes.bool
};

Heading.defaultProps = {
    size: 5,
    gutterBottom: true
};

export default Heading;
