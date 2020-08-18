import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Scrollbar from '@ui/Scrollbar';
import ListItemToggle from './ListItemToggle';

const List = React.forwardRef(function List(props, ref) {
    const {
        children,
        className,
        minLength,
        maxHeight,
        autoHeight = true,
        scrollbarProps,
        scrollbarRef,
        renderItemToggle,
        ...other
    } = props;

    const [expanded, setExpanded] = useState(false);

    const handleToggle = useCallback(() => {
        setExpanded((prevState) => !prevState);
    }, []);

    const scrollable = !autoHeight || maxHeight;
    const enhancedScrollbarProps = {
        ...(maxHeight && { autoHeight: true, autoHeightMax: maxHeight }),
        ...scrollbarProps
    };

    const items = React.Children.toArray(children);
    const shouldDisplayToggle = minLength && minLength < items.length;
    const itemsSlice = minLength && !expanded ? items.slice(0, minLength) : items;

    return (
        <div role="list" className={classNames('list', className)} ref={ref} {...other}>
            {scrollable ? (
                <Scrollbar {...enhancedScrollbarProps} ref={scrollbarRef}>
                    {children}
                </Scrollbar>
            ) : (
                <>
                    {itemsSlice}
                    {shouldDisplayToggle &&
                        (renderItemToggle ? (
                            renderItemToggle({ items, expanded, minLength, onClick: handleToggle })
                        ) : (
                            <ListItemToggle expanded={expanded} onClick={handleToggle} />
                        ))}
                </>
            )}
        </div>
    );
});

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    minLength: PropTypes.number,
    maxHeight: PropTypes.number,
    autoHeight: PropTypes.bool,
    scrollbarProps: PropTypes.object,
    scrollbarRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    renderItemToggle: PropTypes.func
};

export default List;
