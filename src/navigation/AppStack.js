import React from 'react';
import { SelectCountry, CompareCurrenciesRate } from 'screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="SelectCountry" component={SelectCountry} options={{ headerShown: false }} />
      <Stack.Screen name="CompareCurrenciesRate" component={CompareCurrenciesRate} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
