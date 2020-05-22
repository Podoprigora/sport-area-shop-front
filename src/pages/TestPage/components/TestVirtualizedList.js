/* eslint-disable react/prop-types */
/*  Sources: 
    https://codesandbox.io/s/00nw2w1jv?file=/src/CustomList.js:431-459
    https://codesandbox.io/s/t4352?file=/index.js:607-647
*/

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { FixedSizeList, VariableSizeList, areEqual } from 'react-window';
import memoize from 'memoize-one';

import { ListItem, ListItemAction, ListItemText } from '@components/List';
import Checkbox from '@components/Checkbox';
import Scrollbar from '@components/Scrollbar';

const listData = Array.from(Array(1000000)).map((item, i) => ({
    id: i + 1,
    title: `Lorem ipsum dolor sit, amet consectetur`
}));

const VirtualizedListItem = (props) => {
    const { data, index, style } = props;
    const { items, selected, onCheckChange } = data;
    const { id, title } = items[index];

    return (
        <ListItem button style={style} onClick={onCheckChange(index)}>
            <ListItemAction>
                <Checkbox tabIndex="-1" checked={selected.indexOf(index) !== -1} />
            </ListItemAction>
            <ListItemText flex>
                {title} <strong>{index}</strong>
            </ListItemText>
            <ListItemText>(34)</ListItemText>
        </ListItem>
    );
};

const VirtualizedList = (props) => {
    const { data, selected, onCheckChange } = props;
    const listRef = useRef(null);

    const handleScroll = useCallback((ev) => {
        const { target } = ev;

        listRef.current.scrollTo(target.scrollTop);
    }, []);

    const itemData = {
        items: data,
        selected,
        onCheckChange
    };

    return (
        <div
            style={{
                maxWidth: '50rem',
                width: '100%',
                background: '#fff',
                marginBottom: '1.6rem'
            }}
            className="list"
        >
            <Scrollbar autoHeight autoHeightMax={300} onScroll={handleScroll}>
                <FixedSizeList
                    height={300}
                    itemCount={data.length}
                    itemData={itemData}
                    itemSize={40}
                    style={{ overflow: false }}
                    ref={listRef}
                >
                    {VirtualizedListItem}
                </FixedSizeList>
            </Scrollbar>
        </div>
    );
};

const TestVirtualizedList = () => {
    const [selected, setSelected] = useState([]);

    const handleCheckChange = useCallback(
        (index) => (ev) => {
            setSelected((prevState) => {
                const newState = [...prevState];
                const existIndex = newState.indexOf(index);

                if (existIndex !== -1) {
                    newState.splice(existIndex, 1);
                } else {
                    newState.push(index);
                }

                return newState;
            });
        },
        []
    );

    return (
        <VirtualizedList data={listData} selected={selected} onCheckChange={handleCheckChange} />
    );
};

export default TestVirtualizedList;
