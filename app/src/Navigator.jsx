import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
 
import commonStyles from './commonStyles';
import Auth from './screens/Auth';
import TaskList from './screens/TaskList';

 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
 
const DrawerNavigator = props => {
    return (
        <Drawer.Navigator screenOptions={{
          drawerLabelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontSize: 20,
          
          },
          
        }}>
            <Drawer.Screen name="Today" options={{ title: 'Hoje' }}>
                {props => <TaskList {...props} title='Hoje' daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name="Tomorrow" options={{ title: 'Amanhã' }}>
                {props => <TaskList {...props} title='Amanhã' daysAhead={1} />}
            </Drawer.Screen>
            <Drawer.Screen name="Week" options={{ title: 'Semana' }}>
                {props => <TaskList {...props} title='Semana' daysAhead={7} />}
            </Drawer.Screen>
            <Drawer.Screen name="Month" options={{ title: 'Mês' }}>
                {props => <TaskList {...props} title='Mês' daysAhead={30} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};
 
const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
        </Stack.Navigator>
    );
};
 
const Navigator = () => {
    return (
            <AuthNavigator />
  
    );
};
 
export default Navigator;