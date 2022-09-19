import React from 'react'
import {  View, ActivityIndicator } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { RFValue, theme, WIDTH } from 'utils';

interface IProps {
    data: {
        labels: string[],
        datasets: [
            {
                data: number[]
            }
        ]
    }| null,
    loading: boolean
} 

const Chart = (props: IProps) => {

    const { data, loading } = props

    if (!data) return null
    else return (
        <View style={{ justifyContent: 'center' }}>
            {
                loading && <ActivityIndicator color='#fff' size='large' style={{ position: 'absolute', zIndex: 100, alignSelf: 'center', }} />
            }
            <LineChart
                data={data}
                width={WIDTH()-RFValue(40)} // from react-native
                height={300}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor:theme.primary,
                    backgroundGradientFrom:theme.secondary,
                    backgroundGradientTo:theme.light,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: theme.light
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )

}

export { Chart }