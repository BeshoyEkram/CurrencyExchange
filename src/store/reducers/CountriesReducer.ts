import { SET_ALL_COUNTRIES } from 'store/actions/types';
import { ICountry } from 'models';

export interface IStore_Countries{
  allCountries:ICountry[]
}

const INITIAL_STATE = {
  allCountries: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALL_COUNTRIES:
      return { ...state, allCountries: action.payload };

    default:
      return state;
  }
};

