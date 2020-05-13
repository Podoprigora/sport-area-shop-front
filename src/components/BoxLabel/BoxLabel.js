import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BoxLabel = React.forwardRef(function BoxLabel(props, ref) {
    const { children, className, label, labelAlign, ...other } = props;

    return (
        <label
            className={classNames('box-label', className, {
                [`box-label--align-${labelAlign}`]: labelAlign
            })}
            ref={ref}
            {...other}
        >
            <div className="box-label__content">{children}</div>
            {label && <div className="box-label__text">{label}</div>}
        </label>
    );
});

BoxLabel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    labelAlign: PropTypes.oneOf(['left', 'right'])
};

export default BoxLabel;
