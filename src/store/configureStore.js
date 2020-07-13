import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

export default function configureStore(defaultState = {}) {
    const middleware = [];
    let composeEnhancer = compose;

    if (process.env.NODE_ENV === 'development') {
        middleware.push(
            createLogger({
                collapsed: true
            })
        );

        composeEnhancer = composeWithDevTools({
            persit: false
        });
    }

    return createStore(rootReducer, defaultState, composeEnhancer(applyMiddleware(...middleware)));
}
