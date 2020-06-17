import React from 'react';
import classNames from 'classnames';

const withIconAttributes = (ComposedComponent) => ({ className, size, ...props }) => {
    const sizeClass = size && `icon--${size}`;

    return (
        <div className={classNames('icon', sizeClass, className)} {...props}>
            <ComposedComponent preserveAspectRatio="xMidYMid meet" className="svg-icon" />
        </div>
    );
};

export default withIconAttributes;
