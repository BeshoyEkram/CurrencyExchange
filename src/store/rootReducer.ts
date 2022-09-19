import { combineReducers } from "redux";
import CountriesReducer from 'store/reducers/CountriesReducer';
import { IStore_Countries } from './reducers/CountriesReducer';

export default combineReducers({
  Countries: CountriesReducer,
});

export interface IRootState {
Countries:IStore_Countries
}


