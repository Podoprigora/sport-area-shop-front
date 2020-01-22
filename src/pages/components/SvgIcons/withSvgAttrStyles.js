import React from 'react';

const withIconAttributes = (ComposedComponent) => ({ className, ...props }) => {
    const attrs = {
        className: ['svg-icon', ...(className ? [className] : [])].join(' ')
    };

    return <ComposedComponent {...attrs} {...props} />;
};

export default withIconAttributes;
