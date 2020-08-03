// The idea was described in article https://levelup.gitconnected.com/react-redux-and-the-strategy-pattern-8019c0c5bb54

const defaultStrategy = (state) => state;

export default function reducerFactory(strategyMap, defaultState) {
    return (state = defaultState, action) =>
        (strategyMap[action.type] ?? defaultStrategy)(state, action);
}
