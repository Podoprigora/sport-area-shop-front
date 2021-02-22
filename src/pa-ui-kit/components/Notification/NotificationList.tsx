import React, { useState, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import { Portal } from '../Portal';
import { NotificationItem, NotificationItemProps } from './NotificationItem';

export type NotificationListPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface NotificationListProps {
    items?: NotificationItemProps[];
    position?: NotificationListPosition;
    onTransitionEnter: VoidFunction;
    onTransitionEntered: VoidFunction;
}

export const NotificationList = (props: NotificationListProps) => {
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
