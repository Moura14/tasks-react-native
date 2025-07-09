import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Auth from './screens/Auth';
import TasksList from './screens/TaskList';

const Stack = createNativeStackNavigator();

export default function Navigator({ isAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="TasksList" component={TasksList} />
      ) : (
        <Stack.Screen name="Auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
}
