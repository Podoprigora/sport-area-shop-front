import React from 'react';
import classNames from 'classnames';

const withIconAttributes = (ComposedComponent) => (props) => {
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

export default withIconAttributes;
