import React from 'react'
import RNLinearGradient from 'react-native-linear-gradient';
import { HEIGHT, theme } from 'utils';

const LinearGradient = ()=>{

    return (
        <RNLinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[
            theme.primary,theme.secondary,theme.light
        ]}
        style={{
          position: 'absolute',
          top: 0, end: 0, left: 0,
          height: HEIGHT() * 1
        }}
        />
    ) 
}

export {LinearGradient}
