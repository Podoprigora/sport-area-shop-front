import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';

const CarouselControl = memo(function CarouselControl({ type, hover, position, onClick }) {
    return (
        <button
            type="button"
            className={classNames('carousel__control', {
                'carousel__control--prev': type === 'prev',
                'carousel__control--next': type === 'next',
                'carousel__control--position-outside': position === 'outside',
                'carousel__control--hover': position === 'outside' && hover
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
    hover: PropTypes.bool,
    position: PropTypes.oneOf(['outside', '']),
    onClick: PropTypes.func
};

CarouselControl.defaultProps = {
    type: 'next',
    hover: false,
    position: '',
    onClick: () => {}
};

export default CarouselControl;
