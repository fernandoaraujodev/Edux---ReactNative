import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

//Pages
//import Home from './pages/Home'
import Login from './pages/Login/login';

//Libs
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Instanciando Libs
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();


const Logout = ({navigation}) =>{
  return(
    <View>
      <Text>Deseja sair do app?</Text>
      <Button title="Sair" onPress={() => {
        AsyncStorage.removeItem('@jwt_nyous');
        navigation.push('Login');
      }} />
    </View>
  )
}

const Autenticado = () =>{
  return(
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home}  />
        <Drawer.Screen name='Logout' component={Logout}  />
      </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Login' component ={Login}/>
        <Stack.Screen name = 'Autenticado' component = {Autenticado}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});