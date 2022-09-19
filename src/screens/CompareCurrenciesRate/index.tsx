import React, {  useEffect, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/Ionicons'
import { Chart } from 'UI/Chart'
import { CountryPicker } from 'UI'
import { HEIGHT, WIDTH, RFValue, HeaderHeight } from 'utils'
import { ICountry } from 'models';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useGetChartData } from 'hooks';

export enum DURATION_MODE {
    D,W,M,Y
}

const durationSteps = [
    { id: 1, mode: DURATION_MODE.D, txt: '1D', startData: moment(new Date()).format('YYYY-MM-DD') },
    { id: 2, mode: DURATION_MODE.W, txt: '1W', startData: moment(new Date()).subtract(1, 'weeks').add(1, 'day')./*startOf('week').*/format('YYYY-MM-DD') },
    { id: 3, mode: DURATION_MODE.M, txt: '1M', startData: moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD') },
    { id: 4, mode: DURATION_MODE.Y, txt: '1Y', startData: moment(new Date()).subtract(1, 'year').format('YYYY-MM-DD') }
]

interface IProps {route:{params : {selectedCountry:ICountry}}}

const CompareCurrenciesRate = (props: IProps) => {

    //navigation -----------------------
    const navigation = useNavigation()

    const [selectedCountry, setSelectedCountry] = useState<ICountry>(props.route.params.selectedCountry)
    const [selectedCountry2, setSelectedCountry2] = useState<ICountry>(props.route.params.selectedCountry)

    const [activeDurationIdx, setActiveDurationIdx] = useState(0)

    const { data, loading, handler,error } = useGetChartData()

    useEffect(() => {
        selectedCountry && selectedCountry2 && // selectedCountry.currencies[0].code !=selectedCountry2.currencies[0].code &&
            handler(
                durationSteps[activeDurationIdx].mode,
                durationSteps[activeDurationIdx].startData,
                selectedCountry?.currencies[0].code,
                selectedCountry2?.currencies[0].code,

            )
    }, [activeDurationIdx, selectedCountry, selectedCountry2])
    

    return (
        <View>

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={[
                    "#e26a00",
                    "#fb8c00",
                    "#ffa726"
                    // '#0f0c29', '#1D2671'
                ]}
                style={{
                    position: 'absolute',
                    top: 0, end: 0, left: 0,
                    height: HEIGHT() * 1
                }}>
            </LinearGradient>

            {/* header */}

            <View style={{ height: HeaderHeight, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: RFValue(20) }}>
                    <MaterialIcons name="arrow-back" size={RFValue(30)} color='#fff' />
                </TouchableOpacity>
                <Text style={{ color: '#fff', paddingStart: RFValue(20), fontSize: RFValue(30) }}>Charts</Text>
            </View>


            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                    width: WIDTH() * .9, height: '100%',
                    //  borderWidth: 2, borderColor: '#fff'
                }}>

                    <View style={{ alignSelf: 'center', paddingTop: RFValue(30), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CountryPicker selectedCountry={selectedCountry} onSelectChanged={(c) => { setSelectedCountry(c) }} />

                        <View style={{
                            // backgroundColor:'red', 
                            alignItems: 'center', justifyContent: 'center'
                        }}>

                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 100, width: 50, height: 50 }}
                                onPress={() => {
                                    setSelectedCountry(selectedCountry2)
                                    setSelectedCountry2(selectedCountry)
                                }}>
                                <FontAwesome name="exchange" size={RFValue(30)} color='#fff' />
                            </TouchableOpacity>

                        </View>
                        <CountryPicker selectedCountry={selectedCountry2} onSelectChanged={(c) => { setSelectedCountry2(c) }} />

                    </View>
                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', paddingVertical: RFValue(10) }}>
                        {
                            durationSteps.map((item, idx) => {
                                return (
                                    <TouchableOpacity key={item.id} onPress={() => { setActiveDurationIdx(idx) }}>
                                        <Text style={{ fontSize: RFValue(20), fontWeight: 'bold', color: idx == activeDurationIdx ? '#fff' : 'black' }}>{item.txt}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {/* <FlatList
                        horizontal
                        contentContainerStyle={{
                            borderWidth:1,borderColor:'black',flex:1
                        }}
                        renderItem={({ item }) => {
                           return( <TouchableOpacity>
                                <Text>{item.txt}</Text>
                            </TouchableOpacity>)
                        }}
                        data={durationSteps}
                        extraData={durationSteps}
                    /> */}
                    <Text style={{color:'#fff',fontSize:RFValue(20)}}>{`1 ${selectedCountry?.currencies[0].code} *`}</Text>
                    {!!error.length && <Text>{error}</Text>}
                    <Chart data={data as any} loading={loading} />
                </View>
            </View>

        </View>
    )

}

export { CompareCurrenciesRate }
