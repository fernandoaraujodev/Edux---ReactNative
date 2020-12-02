import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

//Pages
import Objetivos from './pages/Objetivos';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Alunos from './pages/Alunos';
import Login from './pages/Login';

//Libs
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSchool, faChalkboardTeacher, faGraduationCap} from '@fortawesome/free-solid-svg-icons';

//Instanciando Libs
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();

const Autenticado = () =>{
  return(
      
    <Tab.Navigator
    shifting={true}
    activeColor = "#f0edf6"
    inactiveColor = "#3e2465"
    barStyle={styles.areaTab}
    
  >
    <Tab.Screen 
        name="Início" 
        component={Home}
        options={{
          tabBarIcon:()=>(
            <FontAwesomeIcon icon={faSchool} size={30} color="#fff"  />
          )
        }} />
    <Tab.Screen 
          name="Objetivos" 
          component={Objetivos}
          options={{
            tabBarIcon:()=>(
              <FontAwesomeIcon icon={faChalkboardTeacher} size={30} color="#fff" />
            )
          }} />
    <Tab.Screen 
          name="Ranking" 
          component={Ranking} 
          options={{
            tabBarIcon:()=>(
              <FontAwesomeIcon  icon={faGraduationCap} size={30} color="#fff"  />
            )
          }} />
  </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        options={{
          headerShown: false
        }}
        name="Login" component={Login} />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Autenticado" component={Autenticado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  areaTab:{
    backgroundColor : '#00d65f',
    fontSize : 35,
    fontFamily : 'OpenSans',
    padding : 5,
    color : 'white',
    fontWeight : 'bold'
  },
  tabCor :{
    backgroundColor : '#b48484',
    flex: 1
  },
  tabName :{
    marginTop: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});