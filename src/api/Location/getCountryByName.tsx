import axios from 'axios'
import { ICountry } from 'models';

export const getCountryByName = (countryName: string, allCountries: ICountry[]): Promise<{ data: ICountry[] }> => {

  return new Promise(function (resolve, reject) {
    let arrCountries = allCountries.filter((c) => c.name.toLowerCase().indexOf(countryName.toLowerCase()) !== -1);
    if (arrCountries.length) resolve({ data: arrCountries })
    else resolve(axios.get(`https://restcountries.com/v2/name/${countryName}`))
  });
  
};