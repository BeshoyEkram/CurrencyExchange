import moment from 'moment'
import axios from 'axios'

export const getChartData = (startDate: string, baseCurrency: string, targetCurrency: string): Promise<{data:{ rates:[]}}> => {

    return axios.get(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${startDate}&end_date=${moment(new Date()).format('YYYY-MM-DD')}&base=${baseCurrency}&symbols=${targetCurrency}`, 
    {headers:{
        apikey:"cN34EjUE4SkgnSV8IbS06nngLjAm5qKO"
    }})
         
};
