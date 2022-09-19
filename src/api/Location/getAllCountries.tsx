import axios from 'axios'
import { ICountry } from 'models';

export const getAllCountries = (): Promise<{data:ICountry[]}> => {

  return  axios.get('https://restcountries.com/v2/all')
};
