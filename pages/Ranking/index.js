import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,  Image,  TouchableOpacity , StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useFonts } from 'expo-font'
import {url} from '../../utils/constants';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const styles = StyleSheet.create({
    scroll : {
        flex : 1,
        marginTop : StatusBar.currentHeight || 0,
        marginBottom : 8
      },
    iconeTitulo :{
        marginRight : 20
      }, 
    container : {
        flex : 1,
        marginTop : StatusBar.currentHeight || 0
    },   
    MenuSuperior : {
        backgroundColor : '#9200d6',
        height : 60,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
        
      },
      tituloSuperior : {
        fontFamily : 'OpenSans-Bold',
        fontWeight: 'bold',
        color : '#fff', 
        fontSize : 30,
        marginLeft : 20
      },
    titulo : {
        fontSize: 20,
        marginTop: 30,
        color: '#9100d5',
        marginBottom : 25,
        textAlign: 'center',
        fontFamily : 'OpenSans-Bold'
    }
    
})

const Ranking = ( {navigation}) => {
    
    const Logout = () => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }
    
      let [fontsLoaded] = useFonts({
        'OpenSans-Light': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      });

    return(
        <SafeAreaView style={styles.scroll}>
      <ScrollView>
        <View style={styles.container}>
             <View style={styles.MenuSuperior}>
                    <Text style={styles.tituloSuperior}>Edux</Text>
                    <TouchableOpacity onPress={Logout} style={styles.iconeTitulo}>
                        <FontAwesomeIcon icon={faSignOutAlt} size={28} color="#fff" />
                    </TouchableOpacity>
                </View> 
                <Text style={styles.titulo} >OBJETIVOS</Text>  
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default Ranking;