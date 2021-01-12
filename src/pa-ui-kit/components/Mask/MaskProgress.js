import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MaskProgress = React.forwardRef(function MaskProgress(props, ref) {
    const { children, title, className, position = 'center', primary, secondary, ...other } = props;

    const progressElement =
        children &&
        React.cloneElement(children, {
            primary,
            secondary
        });

    return (
        <div
            className={classNames('mask__progress', className, {
                'mask__progress--primary': primary,
                'mask__progress--secondary': secondary,
                [`mask__progress--${position}`]: position
            })}
            {...other}
            ref={ref}
        >
            {progressElement}
            {title && <div className="mask__progress-title">{title}</div>}
        </div>
    );
});

MaskProgress.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    className: PropTypes.string,
    position: PropTypes.oneOf(['top', 'bottom', 'center']),
    primary: PropTypes.bool,
    secondary: PropTypes.bool
};

export default MaskProgress;
