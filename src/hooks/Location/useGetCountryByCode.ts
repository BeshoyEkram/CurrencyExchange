import { useState } from 'react';
import { log } from 'utils';
import {  getCountryByCode } from 'api'
import { ICountry } from 'models';

export const useGetCountryByCode = () => {

  const [data, setData] = useState<ICountry>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handler = (countryCode:string) => {

    setLoading(true);
    setError(false)

    return getCountryByCode(countryCode)
      .then((res: {data:ICountry}) => {
       
        log({res})
       
        setLoading(false);
        if (res.data) {
          setData(res.data)
          return {
            data: res.data,
            loading: false,
            error: ''
          };
        } else {

          setData({});
          setError(false);

          return {
            data: null,
            loading: false,
            error: true,
          };
        }
      })
      .catch(e => {
        console.log('error', e)
        log({ e })

        setData({});
        setLoading(false);
        setError(false);

        return {
          data: null,
          loading: false,
          error: true,
        };
      });
  };

  return {
    data,
    loading,
    error,
    handler,
  };
};
