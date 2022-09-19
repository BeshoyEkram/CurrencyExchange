import { useGetCountryByName } from 'hooks'
import { ICountry } from 'models'
import React, { Component, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Modal,Text, ActivityIndicator, StyleProp, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import { IRootState } from 'store/rootReducer'
import { FlatList } from 'UI'
import { RFValue } from 'utils'
import { CountryRow } from './CountryRow'
// import Modal from "react-native-modal";

export interface IModalCountriesFns {
  openModal: Function
}

interface IProps {
  selectedCountry: ICountry | null,
  containerStyle?: StyleProp<ViewStyle>,
  onSelect: (selectedCountry: ICountry) => void
}

const ModalCountries = forwardRef((props: IProps, ref) => {

  const { containerStyle } = props

  const { handler: getCountryByName, data: searchedCountries, error: getCountryByNameErr, loading: getCountryByNameLoading } = useGetCountryByName()

  const { allCountries } = useSelector((state: IRootState) => ({
    allCountries: state.Countries.allCountries,
  }));

  const [active, setActive] = useState(false)
  const [searchTxt, setSearchTxt] = useState('')

  useEffect(() => {

    searchTxt.length && getCountryByName(searchTxt, allCountries)

  }, [searchTxt])

  const openModal = () => {
    setActive(true)
  }

  useImperativeHandle(ref, () => ({
    openModal: openModal,
  }));

  const onPress_country = (item: ICountry) => {
    props.onSelect(item)
    setActive(false)
    setSearchTxt('')
  }

  const renderEmpty = () => (
    <View style={{
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      flexDirection: 'row', height: RFValue(50), alignItems: 'center',
      borderWidth: 1,
    }}>
      <Text style={{ padding: RFValue(8), fontSize: 16, flex: 1, textAlignVertical: 'center', textAlign: 'center' }}>No Data Found !!</Text>
    </View>
  )

  const onClocseModal = ()=>{
    setActive(false)
    setSearchTxt('')
  }

  const data = searchTxt.length ? searchedCountries : allCountries

  return (
    <Modal
    // isVisible={active}
    // onBackdropPress={onClocseModal}
    // onBackButtonPress={onClocseModal}
    visible={active}
    onRequestClose={onClocseModal}
    >
      {/* 
      <View style={[{
        display: active ? 'flex' : 'none', paddingHorizontal: RFValue(20),
        // width: ref_contentWidth.current,
        // flex: 1
      }, containerStyle]}> */}
      <View style={{
        flexDirection: 'row', width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
      }}>

        <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', }}>
          <Feather style={{}} name="search" size={RFValue(30)} />
        </View>

        <TextInput
          value={searchTxt}
          onChangeText={setSearchTxt}
          placeholder='Seacrch Country' style={{
            flex: 1,
            paddingHorizontal: 10,
            textAlign: 'left',
          }} />
        <TouchableOpacity onPress={onClocseModal} style={{ 
          // borderWidth: 2, borderColor: '#0f0c29', 
          backgroundColor: '#fff', borderRadius: 100, 
          width: RFValue(50), height: RFValue(50), 
          alignItems: 'center', justifyContent: 'center'
           }}>
          <Text>Close</Text>
          {/* <Feather style={{}} name="x" size={RFValue(35)} /> */}
        </TouchableOpacity>
      </View>

      <FlatList
        renderItem={({ item }: { item: ICountry }) => <CountryRow country={item} check={item.name == props.selectedCountry?.name}
          onPress={() => onPress_country(item)}
        />}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(__: any, index: number) => __.name}
        data={data}
        extraData={data}
        LazyLoading={{ lazyInitialRenderLength: 20, lazyRenderItemsLength: 20 }}
      />
      {/* </View> */}
    </Modal>

  )

})

export { ModalCountries }
