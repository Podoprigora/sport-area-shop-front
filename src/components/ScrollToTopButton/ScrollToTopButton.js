import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import useScrollTrigger from '@ui/hooks/useScrollTrigger';
import IconButton from '@ui/IconButton';
import ArrowUpIcon from '@svg-icons/feather/ArrowUpIcon';

const ScrollToTopButton = (props) => {
    const trigger = useScrollTrigger({ threshold: 400, disableReverseScroll: true });

    const handleButtonClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <CSSTransition in={trigger} classNames="scroll-to-top-button" timeout={300} unmountOnExit>
            <IconButton
                primary
                size="large"
                className="scroll-to-top-button"
                onClick={handleButtonClick}
            >
                <ArrowUpIcon />
            </IconButton>
        </CSSTransition>
    );
};

ScrollToTopButton.propTypes = {};

export default memo(ScrollToTopButton);
