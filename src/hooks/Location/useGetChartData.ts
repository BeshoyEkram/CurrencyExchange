import { useState } from 'react';
import { getChartData } from 'api';
import { DURATION_MODE } from 'screens';
import moment from 'moment';

export const useGetChartData = () => {

  const [data, setData] = useState<{data: {labels: string[],datasets: [{data: number[]}]} | null} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handler = (activeMode: DURATION_MODE, startDate: string, baseCurrency: string, targetCurrency: string) => {

    setLoading(true);
    setError('')

    return getChartData(startDate, baseCurrency, targetCurrency)
      .then((res: { data: { rates: [] } }) => {

        setLoading(false);

        if (res?.data?.rates) {

          let data, days: number[] = [], __allDate = Object.keys(res.data.rates),
            allDates = []

          switch (activeMode) {
            case DURATION_MODE.D:
            case DURATION_MODE.W:
              allDates = Object.keys(res.data.rates).map(d=>moment(new Date(d)).format('MM-DD'));
              Object.values(res.data.rates).forEach((ele) => { days.push(Number.parseInt(Object.values(ele).toString())) });

              data = {
                labels: allDates,
                datasets: [
                  {
                    data: days
                  }
                ]

              }
              break;
            case DURATION_MODE.M:

              for (let index = 1; index < 32; index += 8) {
                allDates.push( moment(new Date(__allDate[index])).format('MM-DD'));

                days.push(Number.parseInt(Object.values(res.data.rates[__allDate[index]]).toString()))
              }

              data = {
                labels: allDates,
                datasets: [
                  {
                    data: days
                  }
                ]

              }

              break;
            case DURATION_MODE.Y:

              for (let index = 1; index < 366; index += 61) {
                allDates.push( moment(new Date(__allDate[index])).format('MM-DD'));
                let newVal = Number.parseInt(Object.values(res.data.rates[__allDate[index]]).toString())
                days.push(newVal)
              }

              data = {
                labels: allDates,
                datasets: [
                  {
                    data: days
                  }
                ]

              }

              break;

            default:
              break;
          }
          
          setData(data as any)
          return {
            data: data,
            loading: false,
            error: ''
          };
        } else {

          setData(null);
          setError(res as any);

          return {
            data: null,
            loading: false,
            error: true,
          };
        }
      })
      .catch(e => {

        setData(null);
        setLoading(false);
        setError(e.message);

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
