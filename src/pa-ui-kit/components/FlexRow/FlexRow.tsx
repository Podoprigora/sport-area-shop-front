import React from 'react';
import classNames from 'classnames';

export interface FlexRowProps extends React.ComponentPropsWithRef<'div'> {
    children?: React.ReactNode;
    noWrap?: boolean;
    className?: string;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    justify?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    spacing?: string | number;
}

const FlexRow = React.forwardRef<HTMLDivElement, FlexRowProps>(function FlexRow(
    props,
    forwardedRef
) {
    const {
        children,
        className,
        direction,
        justify,
        alignItems,
        noWrap,
        spacing,
        ...other
    } = props;

    const cols = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        return React.cloneElement(child, {
            className: classNames(child.props.className, {
                [`u-padding-${spacing}`]: !!spacing
            })
        });
    });

    return (
        <div
            className={classNames('u-flex-row', className, {
                [`u-flex-direction-${direction}`]: direction,
                [`u-flex-justify-${justify}`]: justify,
                [`u-flex-align-items-${alignItems}`]: alignItems,
                'u-flex-nowrap': noWrap
            })}
            ref={forwardedRef}
            {...other}
        >
            {cols}
        </div>
    );
});

export { FlexRow };
