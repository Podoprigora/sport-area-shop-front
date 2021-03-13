import React from 'react';

import { FlexRow, FlexRowProps } from '../FlexRow';
import { FlexCol, FlexColProps } from '../FlexCol';

export interface FieldGroupProps extends FlexRowProps {
    colProps?: FlexColProps;
}

const defaultColProps = {
    xs: 'auto'
} as FlexColProps;

export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(function FieldGroup(
    props,
    forwardedRef
) {
    const { children, colProps = defaultColProps, ...other } = props;

    const items = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        return (
            <FlexCol key={index} {...colProps}>
                {child}
            </FlexCol>
        );
    });

    return (
        <FlexRow direction="row" ref={forwardedRef} {...other}>
            {items}
        </FlexRow>
    );
});
