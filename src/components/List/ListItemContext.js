import React, { useContext } from 'react';

const ListItemContext = React.createContext();

const useListItem = () => useContext(ListItemContext);

export { ListItemContext, useListItem };
