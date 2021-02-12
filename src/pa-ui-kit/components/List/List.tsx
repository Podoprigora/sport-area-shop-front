import React, { useCallback } from 'react';
import classNames from 'classnames';
import Scrollbars from 'react-custom-scrollbars';

import { useControlled } from '../utils';
import { Scrollbar, ScrollbarProps } from '../Scrollbar';
import { ListItemToggle, ListItemToggleProps } from './ListItemToggle';

export interface ListProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains of ListItem items
     */
    children?: React.ReactNode;
    className?: string;
    /**
     * If there are more items than maxLenght hide the rest
     * and display toggle control to display hidden items
     */
    maxLength?: number;
    maxHeight?: number;
    autoHeight?: boolean;
    /**
     * Related to maxLength property and govern visibility of hidden items
     */
    expanded?: boolean;
    defaultExpanded?: boolean;
    scrollbarProps?: ScrollbarProps;
    scrollbarRef?: React.Ref<Scrollbars>;
    renderItemToggle?: React.FunctionComponent<ListItemToggleProps>;
    onToggle?: React.ReactEventHandler;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(function List(props, ref) {
    const {
        children,
        className,
        maxLength,
        maxHeight,
        autoHeight = true,
        expanded: expandedProp,
        defaultExpanded = false,
        scrollbarProps,
        scrollbarRef,
        renderItemToggle,
        onToggle,
        ...other
    } = props;

    const [expanded, setExpanded] = useControlled(expandedProp, defaultExpanded);

    const handleToggle = useCallback(
        (ev: React.SyntheticEvent) => {
            setExpanded((prevState) => !prevState);

            if (onToggle) {
                onToggle(ev);
            }
        },
        [setExpanded, onToggle]
    );

    const scrollable = !autoHeight || maxHeight;
    const enhancedScrollbarProps = {
        ...(maxHeight && { autoHeight: true, autoHeightMax: maxHeight }),
        ...scrollbarProps
    };

    const items = React.Children.toArray(children);
    const shouldDisplayToggle = maxLength && maxLength < items.length;
    const itemsSlice = maxLength && !expanded ? items.slice(0, maxLength) : items;

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
                            renderItemToggle({ items, expanded, maxLength, onClick: handleToggle })
                        ) : (
                            <ListItemToggle expanded={expanded} onClick={handleToggle} />
                        ))}
                </>
            )}
        </div>
    );
});
