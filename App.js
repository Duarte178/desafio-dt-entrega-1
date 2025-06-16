
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import ConfigScreen from './screens/ConfigScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Sensores' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhe do Sensor' }} />
        <Stack.Screen name="Config" component={ConfigScreen} options={{ title: 'Configuração' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
