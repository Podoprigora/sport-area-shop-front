import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MaskProgress = React.forwardRef(function MaskProgress(props, ref) {
    const { children, title, className, position = 'center', ...other } = props;

    return (
        <div
            className={classNames('mask__progress', className, {
                [`mask__progress--${position}`]: position
            })}
            {...other}
            ref={ref}
        >
            {children && children}
            {title && <div className="mask__title">{title}</div>}
        </div>
    );
});

MaskProgress.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    className: PropTypes.string,
    position: PropTypes.oneOf(['top', 'bottom', 'center'])
};

export default MaskProgress;
