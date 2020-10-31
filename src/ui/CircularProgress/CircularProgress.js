import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const circleSize = 50;

const CircularProgress = React.forwardRef(function CircularProgress(
    { size = 'medium', primary, secondary, className, style },
    ref
) {
    return (
        <div
            className={classNames('circular-progress', className, {
                'circular-progress--primary': primary,
                'circular-progress--secondary': secondary,
                [`circular-progress--${size}`]: size
            })}
            style={style}
            ref={ref}
        >
            <svg viewBox={`0 0 ${circleSize} ${circleSize}`} className="circular-progress__svg">
                <circle
                    className="circular-progress__svg-circle"
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={circleSize / 2 - 5}
                />
            </svg>
        </div>
    );
});

CircularProgress.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    conteinerSize: PropTypes.number,
    strokeWidth: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool
};

export default CircularProgress;
