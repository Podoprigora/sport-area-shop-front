import React from 'react';
import classNames from 'classnames';

export interface FieldLabelProps extends React.ComponentPropsWithRef<'div'> {
    children: string;
    align?: 'top' | 'left';
    textAlign?: 'left' | 'right' | 'center';
    width?: number | string;
    required?: boolean;
    focused?: boolean;
    disabled?: boolean;
    error?: boolean;
}

export const FieldLabel = React.forwardRef<HTMLDivElement, FieldLabelProps>(function FieldLabel(
    props,
    forwardedRef
) {
    const {
        children,
        align,
        textAlign,
        required,
        disabled,
        focused,
        error,
        className,
        width,
        style
    } = props;

    const labelStyle = {
        ...style,
        ...(!!width && align !== 'top' && { width })
    } as React.CSSProperties;

    return (
        <div
            className={classNames('field__label', className, {
                [`field__label--align-${align}`]: align,
                'field__label--required': required,
                'field__label--error': error,
                'field__label--disabled': disabled,
                'field__label--focused': focused,
                [`u-text-align-${textAlign}`]: textAlign && align !== 'top'
            })}
            style={labelStyle}
            ref={forwardedRef}
        >
            {children}
        </div>
    );
});
