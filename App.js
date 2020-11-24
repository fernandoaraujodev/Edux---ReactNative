import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

//Pages
//import Home from './pages/Home'
//import Login from './pages/Login';

//Libs
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Instanciando Libs
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();


export default function App() {
  //Colocar Navigation
  return (
    <View style={styles.container}>
      <Text>Projeto Iniciado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9200D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
