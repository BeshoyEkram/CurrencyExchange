import { ICountry } from 'models'
import React, { Component } from 'react'
import { ActivityIndicator, GestureResponderEvent, TouchableOpacity, View,Image,Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { RFValue } from 'utils'

interface IProps{
    disabled?:boolean,
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    check:boolean,
    country: ICountry,
}

 const CountryRow = (props:IProps)=> {

    const {disabled,onPress,check,country} = props

    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{ backgroundColor: '#fff' }} activeOpacity={.9}>

        <View style={{backgroundColor: '#fff',paddingHorizontal: 20,flexDirection: 'row', height: RFValue(50), alignItems: 'center', justifyContent: 'space-between'}}>
           <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: country.flags.png }} style={{ resizeMode: 'cover', width: RFValue(30), height: RFValue(20), }} />
            <Text style={{ fontSize: RFValue(16), paddingStart: RFValue(10) }}>{country.name}</Text>
          </View>
          {
            check && <Feather style={{}} name="check" size={RFValue(30)} />
          }
        </View>
      </TouchableOpacity>
    )
  
}

export {CountryRow}
