import { createStore, Store, AnyAction, compose } from "redux";
import { combineReducers } from "redux";
import globalReducer, { IGlobalState } from "./reducer";
import { useDispatch } from "react-redux";

export interface IAppState {
  state: IGlobalState;
}

const appReducer = combineReducers<IAppState>({
  state: globalReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
};

export const useAppDispatch = () => useDispatch();

let composeEnhancers = compose;
if (typeof window !== "undefined") {
  //@ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, composeEnhancers());
  return store;
}
