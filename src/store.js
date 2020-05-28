import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import createReducer from './storeConfig/rootReducer';
import rootSaga from './storeConfig/rootSaga';

// return configureStore
export default (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  // create the core middleware array
  const coreMiddleware = [sagaMiddleware];

  // logOnlyInProduction will include the necessary part according to your process.env.NODE_ENV
  const composeEnhancers = composeWithDevTools({});
  // compose the middleware with additional (optional) enhancers,
  const enhancer = applyMiddleware(...coreMiddleware);

  const store = createStore(
    combineReducers(createReducer()),
    preloadedState,
    composeEnhancers(enhancer),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
