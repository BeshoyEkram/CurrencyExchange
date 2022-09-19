import {SET_ALL_COUNTRIES} from './types';
import { ICountry } from 'models';

export const setAllCountries = (allCountries:ICountry[]) => {
  return {
    type: SET_ALL_COUNTRIES,
    payload: allCountries,
  };
};