


import { createStore, applyMiddleware, compose } from 'redux'
import reducers from "./rootReducer";
import ReduxThunk from "redux-thunk";
import  Reactotron  from 'utils/Reactron'

export const store = createStore(reducers, {}, compose(applyMiddleware(ReduxThunk), Reactotron.createEnhancer()))