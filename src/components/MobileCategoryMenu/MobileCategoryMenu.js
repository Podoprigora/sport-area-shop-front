import React, { useState, useMemo, useEffect, memo } from 'react';
import PropTypes, { number } from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import useEventCallback from '@ui/hooks/useEventCallback';
import MobileCategoryMenuWindow from './MobileCategoryMenuWindow';
import MobileCategoryMenuCard from './MobileCategoryMenuCard';
import { MobileCategoryMenuContext } from './MobileCategoryMenuContext';

const getPathById = (items = [], id, acc = []) => {
    if (typeof id !== 'number' || !id || items.length === 0) {
        return [];
    }

    const result = [id, ...acc];
    const nextItem = items.find((parentItem) => parentItem.id === id);

    if (nextItem && nextItem.parentId) {
        return getPathById(items, nextItem.parentId, result);
    }

    return result;
};

const MobileCategoryMenu = (props) => {
    const { open, data = [], selectedId, onItemClick, onClose } = props;

    const [path, setPath] = useState([]);

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    const handleGroupClick = useEventCallback((ev) => {
        ev.preventDefault();

        setPath((prevState) => {
            return prevState.slice(0, prevState.length - 1);
        });
    });

    const handleBack = useEventCallback((ev) => {
        ev.preventDefault();

        if (path.length === 0) {
            handleClose(ev);
        } else {
            handleGroupClick(ev);
        }
    });

    const handleItemClick = useEventCallback((item) => (ev) => {
        ev.preventDefault();

        const { id, hasItems } = item;

        if (!hasItems) {
            if (onItemClick) {
                onItemClick(ev, item);
            }
        } else {
            setPath((prevState) => {
                const newState = prevState.filter((pathItem) => pathItem !== id);

                newState.push(id);

                return newState;
            });
        }
    });

    useEffect(() => {
        if (open && selectedId) {
            setPath(getPathById(data, selectedId));
        }

        if (open) {
            return () => {
                setPath([]);
            };
        }

        return undefined;
    }, [data, selectedId, open]);

    const contextValue = useMemo(
        () => ({
            data,
            onItemClick: handleItemClick,
            onGroupClick: handleGroupClick
        }),
        [data, handleGroupClick, handleItemClick]
    );

    return (
        <MobileCategoryMenuWindow open={open} onClose={handleClose} onBack={handleBack}>
            <MobileCategoryMenuContext.Provider value={contextValue}>
                <TransitionGroup component={null}>
                    <MobileCategoryMenuCard />
                    {path.map((item, index) => {
                        const itemPath = path.slice(0, index + 1);

                        return <MobileCategoryMenuCard key={item} path={itemPath} />;
                    })}
                </TransitionGroup>
            </MobileCategoryMenuContext.Provider>
        </MobileCategoryMenuWindow>
    );
};

MobileCategoryMenu.propTypes = {
    open: PropTypes.bool,
    selectedId: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isReqired,
            parentId: PropTypes.number.isRequred,
            title: PropTypes.string,
            hasItems: PropTypes.bool
        })
    ),
    onClose: PropTypes.func,
    onItemClick: PropTypes.func
};

export default memo(MobileCategoryMenu);
