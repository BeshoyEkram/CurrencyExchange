import axios from 'axios'
import { ICountry } from 'models';

export const getCountryByCode = (countryCode : string): Promise<{data:ICountry}> => {
  return  axios.get(`https://restcountries.com/v2/alpha/${countryCode}`)
};
 
