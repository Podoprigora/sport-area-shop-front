import React, { useContext } from 'react';

export interface ListItemContextValue {
    disabled?: boolean;
}

export const ListItemContext = React.createContext<ListItemContextValue>({});

export const useListItem = () => useContext(ListItemContext);
