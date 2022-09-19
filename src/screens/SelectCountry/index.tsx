import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useGetAllCountries, useGetCountryByCode } from 'hooks';
import { RFValue, WIDTH, HEIGHT, theme } from 'utils';
import Feather from 'react-native-vector-icons/Feather';
import { ICountry } from 'models';
import DeviceCountry from 'react-native-device-country';
import { navigate } from 'navigation/NavigationServices';
import { CountryPicker } from 'UI/CountryPicker'
import { LinearGradient } from 'UI';

const SelectCountry = () => {

  // state --------
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)

  // hooks --------
  const { handler: getAllCountries,  loading: getAllCountriesLoading } = useGetAllCountries()
  const { handler: getCountryByCode } = useGetCountryByCode()

  // use-effect --------
  useEffect(() => {

    getAllCountries()

    DeviceCountry.getCountryCode()
      .then((result) => {
        getCountryByCode(result.code).then((res) => {
          setSelectedCountry(res.data)
        })
      })
      .catch((e) => {
        console.log(e);
      });

  }, [])

  return (
    <View>
      <LinearGradient />
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: WIDTH() * .9, height: HEIGHT() * .8, borderWidth: 1, borderColor: theme.light }}>

          <Text style={{
            paddingTop: RFValue(40),
            paddingBottom: RFValue(20),
            paddingStart: RFValue(20),
            paddingLeft: 15,
            paddingRight: 15,
            color: '#fff',
            fontSize: RFValue(40)
          }}>
            Select {"\n"}Your Country
          </Text>

          <View style={{ width: WIDTH() * .7, alignSelf: 'center', paddingTop: RFValue(30), flexDirection: 'row' }}>
            <CountryPicker selectedCountry={selectedCountry} loading={getAllCountriesLoading} onSelectChanged={(c) => { setSelectedCountry(c) }} />

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 100, width: 50, height: 50 }} onPress={() => {navigate('CompareCurrenciesRate', { selectedCountry })}}>
                <Feather name="bar-chart-2" size={RFValue(40)} color='#fff' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View >
  )

};

export { SelectCountry };