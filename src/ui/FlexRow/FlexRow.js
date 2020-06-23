import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FlexRow = React.forwardRef(function FlexRow(props, ref) {
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
        return React.cloneElement(child, {
            className: classNames(child.props.className, {
                [`u-padding-${spacing}`]: !!spacing
            })
        });
    });

    return (
        <div
            className={classNames('u-flex-row', className, {
                [`u-flex-direction-${direction}`]: !!direction,
                [`u-flex-justify-${justify}`]: !!justify,
                [`u-flex-align-items-${alignItems}`]: !!alignItems,
                'u-flex-nowrap': noWrap
            })}
            ref={ref}
            {...other}
        >
            {cols}
        </div>
    );
});

FlexRow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    noWrap: PropTypes.bool,
    direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    justify: PropTypes.oneOf([
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly'
    ]),
    alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
    spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default FlexRow;
