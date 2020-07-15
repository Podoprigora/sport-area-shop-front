import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from '@ui/Portal';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NotificationItem from './NotificationItem';

const NotificationList = (props) => {
    const { items = [], position = 'top-center', onTransitionEnter, onTransitionEntered } = props;
    const [exited, setExited] = useState(true);

    const handleEnter = useCallback(() => {
        setExited(false);
        if (onTransitionEnter) {
            onTransitionEnter();
        }
    }, [onTransitionEnter]);

    const handleEntered = useCallback(() => {
        if (onTransitionEntered) {
            onTransitionEntered();
        }
    }, [onTransitionEntered]);

    const handleExited = useCallback(() => {
        setExited(true);
    }, []);

    if (items.length === 0 && exited) {
        return null;
    }

    return (
        <Portal>
            <div
                className={classNames('notification', {
                    [`notification--${position}`]: position
                })}
            >
                <TransitionGroup component={null}>
                    {items.map((item) => {
                        const { id } = item || {};

                        return (
                            <CSSTransition
                                appear
                                key={id}
                                classNames="notification__item"
                                timeout={{
                                    appear: 200,
                                    enter: 400,
                                    exit: 400
                                }}
                                onEnter={handleEnter}
                                onEntered={handleEntered}
                                onExited={handleExited}
                            >
                                <NotificationItem {...item} />
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </div>
        </Portal>
    );
};

NotificationList.propTypes = {
    items: PropTypes.array,
    position: PropTypes.oneOf([
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
    ]),
    onTransitionEnter: PropTypes.func,
    onTransitionEntered: PropTypes.func
};

export default NotificationList;
