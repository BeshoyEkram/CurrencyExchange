import { useState } from 'react';
import { log } from 'utils';
import { getAllCountries } from 'api'
import { ICountry } from 'models';
import {useDispatch} from 'react-redux';
import { setAllCountries } from 'store/actions';

export const useGetAllCountries = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handler = () => {

    setLoading(true);
    setError('')

    return getAllCountries()
      .then((res: {data:ICountry[]}) => {
        log({res})
        setLoading(false);
        if (res.data) {
          setData(res.data)
          dispatch(setAllCountries(res.data))
          return {
            data: res,
            loading: false,
            error: ''
          };
        } else {

          setData([]);
          setError('error');

          return {
            data: null,
            loading: false,
            error: true,
          };
        }
      })
      .catch(e => {

        setData([]);
        setLoading(false);
        setError(e);

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
