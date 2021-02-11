import React, { useState, memo, useRef, useCallback, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
    FixedSizeList as VirtulizedFizedSizeList,
    ListChildComponentProps as VirtualizedListChildComponentProps
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
    List,
    ListProps,
    ListItem,
    ListItemAction,
    ListItemIcon,
    ListItemText,
    ListItemToggle,
    ListItemProps,
    ListSubheader
} from '../components/List';
import { Scrollbar } from '../components/Scrollbar';
import { Checkbox } from '../components/Checkbox';
import { Badge } from '../components/Badge';
import { IconButton } from '../components/IconButton';

import { MessageSquareIcon, SearchIcon } from '../components/svg-icons/feather';
import { ClearCloseIcon } from '../components/svg-icons/material';

export default {
    title: 'PA-UI-KIT/List',
    component: List,
    subcomponents: {
        ListItem,
        ListItemText,
        ListItemIcon,
        ListItemAction,
        ListItemToggle,
        ListSubheader,
        Scrollbar
    }
} as Meta;

type DummyItems = {
    id: number;
    title: string;
}[];

function generateListItems(length: number): DummyItems {
    return Array.from(Array(length)).map((_, index) => {
        const id = index + 1;

        return {
            id,
            title: `Lorem ipsum dolor sit amet ${id}.`
        };
    });
}

// Default List

type DefaultListItemProps = ListItemProps & { count?: number };

const defaultListItems = generateListItems(5);

const DefaultListItem = (props: DefaultListItemProps) => {
    const { children, selected, count, ...other } = props;

    return (
        <ListItem button selected={selected} {...other}>
            <ListItemAction>
                <Checkbox checked={selected} />
            </ListItemAction>
            <ListItemText>{children}</ListItemText>
            {count && (
                <ListItemIcon>
                    <Badge value={count} offset={[-10, 0]} />
                </ListItemIcon>
            )}
        </ListItem>
    );
};

export const Default: Story<ListProps> = (args) => {
    const [checked, setChecked] = useState<number[]>([]);

    const handleItemClick = (index: number) => (ev: React.MouseEvent) => {
        ev.preventDefault();

        setChecked((prevState) => {
            const foundIndex = prevState.indexOf(index);

            if (foundIndex !== -1) {
                return prevState.filter((i) => i !== index);
            }

            return [...prevState, index];
        });
    };

    return (
        <List {...args}>
            <ListSubheader>Default List</ListSubheader>
            {defaultListItems.map((item) => {
                const { id, title } = item;
                const selected = checked.indexOf(id) !== -1;

                return (
                    <DefaultListItem
                        key={id}
                        selected={selected}
                        count={id === 2 ? id * 9 : undefined}
                        onClick={handleItemClick(id)}
                    >
                        {title}
                    </DefaultListItem>
                );
            })}
        </List>
    );
};
Default.args = {
    maxLength: 4
} as ListProps;

// Scrollable list

const scrollableListItems = generateListItems(20);

const ScrollableListItem = memo((props: ListItemProps) => {
    const { children, ...other } = props;

    return (
        <ListItem button {...other}>
            <ListItemIcon>
                <SearchIcon size="medium" />
            </ListItemIcon>
            <ListItemText flex>{children}</ListItemText>
            <ListItemAction>
                <IconButton size="small" tabIndex={-1}>
                    <ClearCloseIcon />
                </IconButton>
            </ListItemAction>
        </ListItem>
    );
});

export const ScrollableList: Story<ListProps> = (args) => {
    return (
        <List {...args}>
            {scrollableListItems.map((item) => {
                const { id, title } = item;

                return (
                    <React.Fragment key={id}>
                        {id % 5 === 0 ? (
                            <ListSubheader>Search result group {id + 1}</ListSubheader>
                        ) : null}
                        <ScrollableListItem>{title}</ScrollableListItem>
                    </React.Fragment>
                );
            })}
        </List>
    );
};

ScrollableList.args = {
    maxHeight: 350
} as ListProps;
ScrollableList.storyName = 'With custom scrollbar';

/**
 * Virtualized List
 *
 * Sources:
 * https://codesandbox.io/s/00nw2w1jv?file=/src/CustomList.js:431-459
 * https://codesandbox.io/s/t4352?file=/index.js:607-647
 * https://codesandbox.io/s/0mk3qwpl4l?file=/src/index.js
 *
 * Docs:
 * https://github.com/bvaughn/react-window
 * https://react-window.now.sh/#/api/FixedSizeList
 */

type VirtualizedItemDataProp = {
    items: DummyItems;
    checked: number[];
    onSelect: (ev: React.SyntheticEvent, index: number) => void;
};

interface VirtualizedItemProps extends VirtualizedListChildComponentProps {
    data: VirtualizedItemDataProp;
}

const virtualizedListItems = generateListItems(2000);

const VirtualizedListItem = (props: VirtualizedItemProps) => {
    const { data, index, style } = props;
    const { items, checked, onSelect } = data;
    const { title } = items[index] || {};
    const selected = checked.indexOf(index) !== -1;

    const handleClick = useCallback(
        (ev: React.SyntheticEvent) => {
            onSelect(ev, index);
        },
        [onSelect, index]
    );

    const handleCommentClick = useCallback((ev: React.SyntheticEvent) => {
        ev.stopPropagation();
    }, []);

    return (
        <ListItem button selected={selected} style={style} onClick={handleClick}>
            <ListItemAction>
                <Checkbox checked={selected} tabIndex={-1} />
            </ListItemAction>
            <ListItemText flex>{title}</ListItemText>
            <ListItemAction>
                <IconButton
                    size="medium"
                    onClick={handleCommentClick}
                    onKeyDown={handleCommentClick}
                >
                    <MessageSquareIcon />
                </IconButton>
            </ListItemAction>
        </ListItem>
    );
};

export const VirtualizedList: Story<ListProps> = (args) => {
    const [checked, setChecked] = useState<number[]>([]);
    const listRef = useRef<VirtulizedFizedSizeList>(null);
    const scrollbarRef = useRef<Scrollbars>(null);

    const handleScroll = useCallback((ev: React.SyntheticEvent<HTMLElement>) => {
        const target = ev.target as HTMLElement;

        if (listRef.current) {
            listRef.current.scrollTo(target.scrollTop);
        }
    }, []);

    const handleItemSelect = useCallback((ev, index) => {
        setChecked((prevState) => {
            const foundIndex = prevState.indexOf(index);

            if (foundIndex !== -1) {
                return prevState.filter((i) => i !== index);
            }

            return [...prevState, index];
        });
    }, []);

    const itemData = useMemo<VirtualizedItemDataProp>(() => {
        return {
            items: virtualizedListItems,
            checked,
            onSelect: handleItemSelect
        };
    }, [handleItemSelect, checked]);

    return (
        <AutoSizer style={{ height: 350, width: '100%' }}>
            {({ height }) => {
                return (
                    <List
                        maxHeight={height}
                        scrollbarRef={scrollbarRef}
                        onScroll={handleScroll}
                        {...args}
                    >
                        <VirtulizedFizedSizeList
                            height={height}
                            width="100%"
                            itemSize={40}
                            itemCount={virtualizedListItems.length}
                            itemData={itemData}
                            ref={listRef}
                            style={{ overflow: 'initial' }}
                        >
                            {VirtualizedListItem}
                        </VirtulizedFizedSizeList>
                    </List>
                );
            }}
        </AutoSizer>
    );
};

VirtualizedList.args = {} as ListProps;
