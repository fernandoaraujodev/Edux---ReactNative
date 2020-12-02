import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,  Image,  TouchableOpacity , StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import {url} from '../../utils/constants';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

const styles = StyleSheet.create({
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
      cardAluno : {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection : 'column',
        alignSelf: 'center',
        height : 80,
        marginTop : 35,
        marginBottom : 35,
        width : 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
        height: 3,
        width: 3
        }
      },
      imagem : {
        height: 35,
        width: 35,
        marginRight : 40,
        marginLeft : 20,
        resizeMode: 'cover'
    },
    scroll : {
        flex : 1,
        marginBottom : 8
      }
      ,
    titulo : {
        fontSize: 20,
        marginTop: 30,
        color: '#9100d5',
        marginBottom : 25,
        textAlign: 'center',
        fontFamily : 'OpenSans-Bold'
    }
});


const Objetivos = ( {navigation}) => {

    let [fontsLoaded] = useFonts({
        'OpenSans-Light': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      });
    
    const Logout = () => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }

    return(
        <SafeAreaView style={styles.scroll}>
      <ScrollView>
        <View style={styles.container}>
            <StatusBar 
                
            />
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
    );
}

export default Objetivos;