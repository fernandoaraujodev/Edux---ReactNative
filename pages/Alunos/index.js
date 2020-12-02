import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,  Image,  TouchableOpacity, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import {url} from '../../utils/constants';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : StatusBar.currentHeight || 0,
        marginBottom : 8
    },  
     MenuSuperior : {
        backgroundColor : '#9200d6',
        height : 60,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
        
      },
      tituloSuperior : {
        fontFamily : 'OpenSans-Bold',
        fontWeight: 'bold',
        color : '#fff', 
        fontSize : 30
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
    titulo : {
        fontSize: 20,
        marginTop: 30,
        color: '#9100d5',
        marginBottom : 25,
        textAlign: 'center',
        fontFamily : 'OpenSans-Bold'
    }
});


const Alunos = ( {navigation}) => {

    const [alunoTurma, setAlunoTurma] = useState([]);
    const [turma, setTurma] = useState([]);

    const getToken = async () => {
        let token = await AsyncStorage.getItem('@jwt');

        fetch(`${url}/AlunoTurma`, {
            method : "GET",
            headers : {
                'authorization' : 'Bearer ' + token
            }
          })
            .then(response => response.json())  
            .then(dados => {


                setAlunoTurma(dados.data);
            })
            .catch(err => console.error(err));

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

    return(
        <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
            <StatusBar 
                
            />
             <View style={styles.MenuSuperior}>
                    <Text style={styles.tituloSuperior}>Edux</Text>
                    <TouchableOpacity onPress={Logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size={34} color="#fff" />
                    </TouchableOpacity>
                </View> 
                <Text style={styles.titulo} >ALUNOS</Text>   

                {
                    turma.map((item1, index1) => {
                        return(
                            <Card style={{marginTop: 15, marginBottom : 15}} key = {index1}>
                            <Card.Title>{item1.descricao}</Card.Title>
                            <Card.Divider/>
                                {
                                    alunoTurma.map((item2, index2) => {
                                        if(item1.idTurma === item2.idTurma){
                                            return(
                                                <View style={{display:'flex',marginBottom : 5, marginTop : 5, flexDirection : 'row', flex : 1, alignItems : 'center', justifyContent: 'flex-start'}} >
                                                <Image
                                                    style={styles.imagem}
                                                    resizeMode = "cover"
                                                    source={{uri : 'https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png'}}
                                                />
                                                <Text>{item2.idUsuarioNavigation.nome}</Text>
                                            </View>
                                            );
                                        }
                                    })
                                }
                                
                            </Card>
                        );
                    })
                }

        </View>
        </ScrollView>
    </SafeAreaView>
    );
}

export default Alunos;