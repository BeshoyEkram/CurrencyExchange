import { Dimensions, StatusBar } from 'react-native';
import Reactotron from 'reactotron-react-native';

function RNRFValue(fontSize: number, deviceHeight: number) {
    const { height, width } = Dimensions.get("window");
    const standardLength = width > height ? width : height;

    const heightPercent = (fontSize * standardLength) / deviceHeight;
    return Math.round(heightPercent);
}
export const log = (values:any) => __DEV__ && Reactotron.log?.(values);
export const RFValue = (x: number) => RNRFValue(x, 896)
export const WIDTH = () => Dimensions.get('window').width;
export const HEIGHT = () => Dimensions.get('window').height;
export const ActualHEIGHT = () => Dimensions.get('window').height - (StatusBar.currentHeight || 0)
export const HeaderHeight = RFValue(70)

export const theme = {
    primary :"#e26a00",
    secondary : "#fb8c00",
    light : "#fb8c00",
    white:'#fff',
}
