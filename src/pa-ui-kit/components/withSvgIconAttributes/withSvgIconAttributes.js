import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const withSvgIconAttributes = (SvgIconComponent) => {
    const EnhencedComponent = React.forwardRef((props, ref) => {
        const { className, size, primary, ...other } = props;

        return (
            <span
                className={classNames('svg-icon', className, {
                    'svg-icon--primary': primary,
                    [`svg-icon--${size}`]: size
                })}
                {...other}
                ref={ref}
            >
                <SvgIconComponent preserveAspectRatio="xMidYMid meet" />
            </span>
        );
    });

    EnhencedComponent.propTypes = {
        className: PropTypes.string,
        size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', null]),
        primary: PropTypes.bool
    };

    return React.memo(EnhencedComponent);
};

withSvgIconAttributes.propTypes = {
    SvgIconComponent: PropTypes.element
};

export default withSvgIconAttributes;
