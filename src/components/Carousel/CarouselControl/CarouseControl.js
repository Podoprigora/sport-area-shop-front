import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';

const CarouselControl = memo(function CarouselControl({ type, active, onClick }) {
    return (
        <button
            type="button"
            className={classNames('carousel__control', {
                'carousel__control--prev': type === 'prev',
                'carousel__control--next': type === 'next',
                'carousel__control--active': active
            })}
            onClick={onClick}
        >
            {type === 'next' ? (
                <ChevronRightIcon size="xlarge" />
            ) : (
                <ChevronLeftIcon size="xlarge" />
            )}
        </button>
    );
});

CarouselControl.propTypes = {
    type: PropTypes.oneOf(['next', 'prev']),
    active: PropTypes.bool,
    onClick: PropTypes.func
};

CarouselControl.defaultProps = {
    type: 'next',
    active: false,
    onClick: () => {}
};

export default CarouselControl;
