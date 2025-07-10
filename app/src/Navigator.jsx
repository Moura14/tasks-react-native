// Navigator.js (sem lógica de autenticação aqui)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Auth from './screens/Auth';
import TasksList from './screens/TaskList';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="TasksList" component={TasksList} />
    </Stack.Navigator>
  );
}
