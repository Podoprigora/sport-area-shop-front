import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const circleSize = 50;

const CircularProgress = React.forwardRef(function CircularProgress(
    { preset = 'medium', size, strokeWidth, primary, className, style },
    ref
) {
    let containerSize = size;
    let circleStrokeWidth = strokeWidth;

    switch (preset) {
        case 'small':
            containerSize = 24;
            circleStrokeWidth = 4;
            break;
        case 'medium':
            containerSize = 36;
            circleStrokeWidth = 3;
            break;
        case 'large':
            containerSize = 60;
            circleStrokeWidth = 2.25;
            break;
        default:
            containerSize = size;
            circleStrokeWidth = strokeWidth;
    }

    return (
        <div
            className={classNames('circular-progress', className, {
                'circular-progress--primary': primary
            })}
            style={{ ...style, width: containerSize, height: containerSize }}
            ref={ref}
        >
            <svg viewBox={`0 0 ${circleSize} ${circleSize}`} className="circular-progress__svg">
                <circle
                    className="circular-progress__svg-circle"
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={circleSize / 2 - 5}
                    strokeWidth={circleStrokeWidth}
                />
            </svg>
        </div>
    );
});

CircularProgress.propTypes = {
    preset: PropTypes.string,
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    primary: PropTypes.bool
};

export default CircularProgress;
