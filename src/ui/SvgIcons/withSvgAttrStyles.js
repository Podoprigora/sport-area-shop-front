import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const withIconAttributes = (ComposedComponent) => {
    const EnhancedComponent = (props) => {
        const { className, size, primary, ...other } = props;

        const sizeClass = size && `icon--${size}`;

        return (
            <div
                className={classNames('icon', sizeClass, className, {
                    'icon--primary': primary
                })}
                {...other}
            >
                <ComposedComponent preserveAspectRatio="xMidYMid meet" className="svg-icon" />
            </div>
        );
    };

    EnhancedComponent.propTypes = {
        className: PropTypes.string,
        size: PropTypes.string,
        primary: PropTypes.bool
    };

    return EnhancedComponent;
};

withIconAttributes.propTypes = {
    ComposedComponent: PropTypes.element
};

export default withIconAttributes;
