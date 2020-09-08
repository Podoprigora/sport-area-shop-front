import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Skeleton = React.forwardRef(function Skeleton(props, ref) {
    const { type = 'text', size = 'medium', animation = 'wave', className, style } = props;

    return (
        <div
            className={classNames('skeleton', className, {
                [`skeleton--${type}`]: type,
                [`skeleton--${size}`]: size,
                [`skeleton--animation-${animation}`]: animation
            })}
            style={style}
            ref={ref}
        />
    );
});

Skeleton.propTypes = {
    type: PropTypes.oneOf(['text', 'circle', 'rect']),
    size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
    animation: PropTypes.oneOf(['pulse', 'wave', false]),
    style: PropTypes.object,
    className: PropTypes.string
};

export default Skeleton;
