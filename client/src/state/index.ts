import { createStore, applyMiddleware, Store, compose, AnyAction } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import globalReducer, { IGlobalState } from "./reducer";
import { useDispatch } from "react-redux";

export interface IAppState {
  state: IGlobalState;
}

//const store = createStore(combineReducers, applyMiddleware(thunk));
const appReducer = combineReducers<IAppState>({
  state: globalReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
};

//@ts-ignore
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
////const store = createStore(
///// rootReducer,
///* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
//);

export const useAppDispatch = () => useDispatch();

export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  //const store = createStore(rootReducer);
  return store;
}
