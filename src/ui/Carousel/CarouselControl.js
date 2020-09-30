import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';

const CarouselControl = (props) => {
    const { type = 'next', active = false, disabled, onClick } = props;

    const handleClick = useCallback(
        (ev) => {
            if (active && !disabled && onClick) {
                onClick(ev);
            }
        },
        [active, disabled, onClick]
    );

    return (
        <button
            type="button"
            className={classNames('carousel__control', {
                'carousel__control--prev': type === 'prev',
                'carousel__control--next': type === 'next',
                'carousel__control--active': active,
                'carousel__control--disabled': disabled
            })}
            onClick={handleClick}
        >
            {type === 'next' ? (
                <ChevronRightIcon size="xlarge" />
            ) : (
                <ChevronLeftIcon size="xlarge" />
            )}
        </button>
    );
};

CarouselControl.propTypes = {
    type: PropTypes.oneOf(['next', 'prev']),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(CarouselControl);
