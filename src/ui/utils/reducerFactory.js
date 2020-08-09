// The main idea was described in article https://levelup.gitconnected.com/react-redux-and-the-strategy-pattern-8019c0c5bb54

const defaultStrategy = (state) => state;

export default function reducerFactory(strategyMap, defaultState) {
    return (state = defaultState, { type, payload = null }) => {
        return (strategyMap[type] ?? defaultStrategy)(state, payload);
    };
}
