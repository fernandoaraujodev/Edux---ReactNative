import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,  Image,  TouchableOpacity , StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import {url} from '../../utils/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
    container : {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection : 'row',
        alignSelf: 'center',
        height : '20%',
        marginBottom : 35,
        width : '90%',
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
        marginLeft :30,
        height: 80,
        width: 80,
        resizeMode: 'stretch'
    },
    titulo : {
        fontSize: 20,
        marginTop: 30,
        color: '#9100d5',
        marginBottom : 25,
        textAlign: 'center',
        fontFamily : 'OpenSans-Bold'
    },
    curso :{
        display: 'flex', 
        justifyContent: 'flex-start',
        alignItems : 'flex-start',
        marginLeft : 30
    },
    nomeCurso : {
        fontSize : 14,
        marginBottom : 3,
        fontFamily : 'OpenSans-Light'
    },
    subCurso : {
        fontSize : 10,
        fontFamily : 'OpenSans'
    },
    MenuSuperior : {
        backgroundColor : '#9200d6',
        height : 60,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        
      },
      tituloSuperior : {
        fontFamily : 'OpenSans-Bold',
        fontWeight: 'bold',
        color : '#fff', 
        fontSize : 30,
        marginLeft : 20
      },
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
      iconeTitulo :{
        marginRight : 20
      }, 
      scroll : {
        flex : 1,
        marginTop : StatusBar.currentHeight || 0,
        marginBottom : 8
      }
    

})

const Turma = ( {navigation} ) => {

   
    const [turma, setTurma] = useState([]);

    const getToken = async () => {
        let token = await AsyncStorage.getItem('@jwt');

        fetch(`${url}/Turma`, {
            method : "GET",
            headers : {
                'authorization' : 'Bearer ' + token
            }
          })
            .then(response => response.json())  
            .then(dados => {


                setTurma(dados.data);
            })
            .catch(err => console.error(err));
        
    }

    useEffect(() =>{
        getToken();
    }, []);
  
    let [fontsLoaded] = useFonts({
        'OpenSans-Light': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      });

      const Logout = () => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }

        return (
            
            <SafeAreaView style={styles.scroll}>
      <ScrollView>
            <View>
                <View style={styles.MenuSuperior}>
                    <Text style={styles.tituloSuperior}>Edux</Text>
                    <TouchableOpacity onPress={Logout} style={styles.iconeTitulo}>
                        <FontAwesomeIcon icon={faSignOutAlt} size={28} color="#fff" />
                    </TouchableOpacity>
                </View> 
                <Text style={styles.titulo} >TURMAS</Text>   
               {
                    turma.map((item,index)=> {
                        return(
                            <View style={styles.container} key={index}>
                                <Image
                                style={styles.imagem}
                                    source={require('../../assets/logo-professor.png')}
                                />
                            <View style={styles.curso}>
                                    <Text style={styles.nomeCurso}>{item.descricao}</Text>
                                    <Text style={styles.subCurso}>{item.idCursoNavigation.titulo}</Text>
                            </View>
                            </View>
                        )
                    })
                }  
            </View>
            </ScrollView>
    </SafeAreaView>
        )
    

    
}

export default Turma;