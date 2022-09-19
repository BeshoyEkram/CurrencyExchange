import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList as RNFlatList, StyleProp, View, ViewStyle } from 'react-native'
import { RFValue } from 'utils';

interface FlatListProps {
  columnWrapperStyle?: StyleProp<ViewStyle>;
  renderItem: (item: any) => JSX.Element
  data: Array<any>,
  extraData?: Array<any>,
  style?: ViewStyle | ViewStyle[]
  contentContainerStyle?: ViewStyle | ViewStyle[]
  horizontal?: boolean,
  keyExtractor?: (item: object, index: number) => string,
  showsVerticalScrollIndicator?: boolean,
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null,
  onEndReachedThreshold?: number | null,
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null,
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null,
  numColumns?: number
  onScroll?: (e: {
    nativeEvent: {
      layoutMeasurement: {
        height: number
      },
      contentOffset: {
        y: number
      },
      contentSize: {
        height: number
      }

    }

  }) => void,
  LazyLoading?: {
    lazyInitialRenderLength: number,
    lazyRenderItemsLength: number
  }
}

const FlatList = (props: FlatListProps) => {

  const { data, LazyLoading } = props

  const { lazyInitialRenderLength, lazyRenderItemsLength } = props.LazyLoading || { lazyInitialRenderLength: !!LazyLoading ? data.length : 20, lazyRenderItemsLength: !!LazyLoading ? data.length : 20 }
  const [renderLength, setRenderLength] = useState(lazyInitialRenderLength)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)

  useEffect(() => {

    !!LazyLoading && onEndReachedCalledDuringMomentum && setOnEndReachedCalledDuringMomentum(false)
  }, [LazyLoading, data, onEndReachedCalledDuringMomentum])

  const onEndReached = () => {
    
    
    if (!onEndReachedCalledDuringMomentum) {

      if (renderLength >= data.length) {

        setOnEndReachedCalledDuringMomentum(true);

      } else {
        setRenderLength(r => r + ((data.length - r) >= lazyRenderItemsLength ? lazyRenderItemsLength : (data.length - r)))
      }

    }
  }

  const ListFooterComponent = () => {

    if (renderLength >= data.length) return null;
    else
      return (
        <View style={{
          backgroundColor:'#fff',
          height: RFValue(50),
        }}>
          <ActivityIndicator size="large" />
        </View>
      );
  }

  return (<RNFlatList
    alwaysBounceVertical={false}
    alwaysBounceHorizontal={false}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    {...props}
    style={{
      width: '100%',
      flexGrow: 0,
      height: '100%'
    }}
    // contentContainerStyle={
    //   [
    //     !props.horizontal
    //       ? { width: '100%', flexGrow: 1, alignItems: 'center' }
    //       : {},
    //   ]}
    contentContainerStyle={props.contentContainerStyle}

    {...(!!props.LazyLoading ? {
      onEndReachedThreshold: 0.1,
      onEndReached: onEndReached,
      ListFooterComponent: ListFooterComponent,
      data: props.data.slice(0, renderLength)
    } : {
      data: props.data
    })}

  />)
}

export { FlatList }