import React from 'react'
import { ActivityIndicator, GestureResponderEvent, TouchableOpacity, View,Image,Text, } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { ICountry } from 'models';
import { RFValue } from 'utils';

interface IProps {
    loading: boolean,
    selectedCountry: ICountry | null,
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Picker = (props: IProps) => {

    const { loading, selectedCountry,onPress } = props

    return (
        <View style={{   }}>

            <TouchableOpacity activeOpacity={.9} disabled={loading} onPress={onPress} >

                <View style={{padding: 10,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    {loading ? <ActivityIndicator size={RFValue(30)} /> :
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: selectedCountry?.flags.png }} style={{ resizeMode: 'cover', width: RFValue(100), height: RFValue(60), }} />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: RFValue(16), paddingStart: RFValue(10) }}>{selectedCountry?.currencies[0].code}</Text>
                                <Feather style={{ color: '#fff' }} name="chevron-down" size={RFValue(30)} />
                            </View>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}
export { Picker }
