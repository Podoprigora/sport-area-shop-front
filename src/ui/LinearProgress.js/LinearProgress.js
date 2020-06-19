import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LinearProgress = React.forwardRef(function LinearProgress(props, ref) {
    const { height, primary, secondary, className, style, ...other } = props;

    return (
        <div
            className={classNames('linear-progress', className, {
                'linear-progress--primary': primary,
                'linear-progress--secondary': secondary
            })}
            style={{ height, ...style }}
            {...other}
            ref={ref}
        >
            <div className="linear-progress__bar" />
        </div>
    );
});

LinearProgress.propTypes = {
    height: PropTypes.number,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

export default LinearProgress;
