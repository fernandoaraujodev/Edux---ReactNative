import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,  Image,  TouchableOpacity , StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import {url} from '../../utils/constants';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import jwt_decode from "jwt-decode";

const styles = StyleSheet.create({
  container : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection : 'column',
    alignSelf: 'center',
    height : '25%',
    marginBottom : 35,
    width : '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "red",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
    height: 3,
    width: 3
    }
},
imagem : {
    alignSelf : 'center',
    height: '50%',
    width: '90%',
    borderRadius : 10,
    paddingBottom : 10,
    resizeMode: 'cover'
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
    marginLeft : 30,
    marginTop : 20
},
nomeCurso : {
    fontSize : 20,
    marginBottom : 5,
    fontFamily : 'OpenSans-Light'
},
subCurso : {
    fontFamily : 'OpenSans',
    fontSize: 15,
    width:'92%',
    textAlign: 'justify'
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
    marginBottom : 25
  }
});


const Objetivos = ( {navigation}) => {

   
  const [objetivos, setObjetivos] = useState([]);

  const getToken = async () => {
      let token = await AsyncStorage.getItem('@jwt');

      let idUser = jwt_decode(token);

        fetch(`${url}/AlunoTurma`, {
          method : "GET",
          headers : {
              'authorization' : 'Bearer ' + token
          }
        })
          .then(response => response.json())  
          .then(dados => {

            dados.data.map((item, index) => {
              if(parseInt(item.idUsuario) === parseInt(idUser.family_name)){
                  idUser = item.idUsuario;
              }
            })
          })
          .catch(err => console.error(err));

      fetch(`${url}/AlunoObjetivo`, {
          method : "GET",
          headers : {
              'authorization' : 'Bearer ' + token
          }
        })
          .then(response => response.json())  
          .then(dados => {
            setObjetivos(dados.data);

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
              <Text style={styles.titulo} >OBJETIVOS</Text>   
             {
                  objetivos.map((item,index)=> {
                      if(item.nota === undefined){
                        return(
                          <View style={styles.container} key={index}>
                              <Image
                              style={styles.imagem}
                                  source={require('../../assets/logo-professor.png')}
                              />
                          <View style={styles.curso}>
                                  <Text style={styles.nomeCurso}>Nenhuma nota lançada</Text>
                                  <Text style={styles.subCurso}>{item.idObjetivoNavigation.descricao}</Text>
                                  <Text style={{color : 'gray', fontSize : 12}}>{item.dataAlcancada}</Text>
                                  
                          </View>
                          </View>
                      )
                      }else{
                        return(
                          <View style={styles.container} key={index}>
                              <Image
                              style={styles.imagem}
                                  source ={{
                                    uri:'https://ead.pucgoias.edu.br/hs-fs/hubfs/objetivo-profissional-por-que-importante-definir.jpg?width=1000&name=objetivo-profissional-por-que-importante-definir.jpg'
                                  }}
                              />
                          <View style={styles.curso}>
                                  <Text style={styles.nomeCurso}>Nota : {item.nota}</Text>
                                  <Text style={styles.subCurso}>{item.idObjetivoNavigation.descricao}</Text>
                                  <Text style={{color : 'gray', fontSize : 12}}>{item.dataAlcancada}</Text>
                                 
                          </View>
                          </View>
                      )
                      }
                  })
              }  
          </View>
          </ScrollView>
  </SafeAreaView>
      )
  

  
}

export default Objetivos;