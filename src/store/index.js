import createSagaMiddleware from 'redux-saga';

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Create middlewares for redux
let middlewares = applyMiddleware(sagaMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middlewares));

// run saga watchers
sagaMiddleware.run(rootSaga);

export default store;
