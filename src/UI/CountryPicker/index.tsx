import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native';
import { Picker } from './Picker'
import { ModalCountries } from './ModalCountries'
import { ICountry } from 'models';
import { IModalCountriesFns } from './ModalCountries';

interface IProps {
    loading?: boolean,
    selectedCountry: ICountry | null,
    onSelectChanged: (selectedCountry: ICountry) => void
}

const CountryPicker = (props: IProps) => {

    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)

    const refModalCountries = useRef<IModalCountriesFns>()

    useEffect(() => {
        setSelectedCountry(props.selectedCountry)
    }, [props.selectedCountry])

    useEffect(() => {
        selectedCountry && props.onSelectChanged(selectedCountry as ICountry)
    }, [selectedCountry])

    return (<View style={{flex:1,
    borderWidth:1,borderColor:'#ffa726'
    }}>
        <Picker
            // onPress={() => onPress_listBtn(item, hasDropIcon)} 
            selectedCountry={selectedCountry} loading={props.loading} onPress={()=>{
                refModalCountries.current?.openModal()
            }} />
        <ModalCountries ref={refModalCountries} onSelect={setSelectedCountry} selectedCountry={selectedCountry} />
    </View>)

}

export { CountryPicker }

