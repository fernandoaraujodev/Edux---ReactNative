import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,  Image,  TouchableOpacity , StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useFonts } from 'expo-font'
import {url} from '../../utils/constants';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from "jwt-decode";


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

const Ranking = ( ) => {
    
    const Logout = () => {
        AsyncStorage.removeItem('@jwt');
        // navigation.push('Login');
      }

      useEffect(() =>{
        getToken();
        Ranking();
    }, []);
    const [nome, setNome] = useState(null);
    const [curtidas, setCurtidas] = useState([]);
    const [notas, setNotas] = useState([]);
    const [objOcultos, setObjOcultos] = useState([]);
    const [objConcluidos, setObjConcluidos] = useState([]);
    const [id, setId] = useState(null);
    let cont = 0;
    let cont1 = 0;

    const getToken = async () => {
        let token = await AsyncStorage.getItem('@jwt');
        let nome = jwt_decode(token).nameid;
        setNome(nome);
        setId(jwt_decode(token).family_name);
        
    }

    const Ranking = async () => {
      fetch(`${url}/RankingNotas`, {
        method : "GET"
      })
        .then(response => response.json())  
        .then(dados => {
          setNotas(dados.data);
        })
        .catch(err => console.error(err));

        fetch(`${url}/RankingCurtida`, {
          method : "GET"
        })
          .then(response => response.json())  
          .then(dados => {
            setCurtidas(dados.data);
            
          })
          .catch(err => console.error(err));  

          fetch(`${url}/RankingObjOcultos`, {
            method : "GET"
          })
            .then(response => response.json())  
            .then(dados => {
              setObjOcultos(dados.data);
              console.log(dados.data);
              
            })
            .catch(err => console.error(err));  

            fetch(`${url}/RankingObjConcluidos`, {
              method : "GET"
            })
              .then(response => response.json())  
              .then(dados => {
                setObjConcluidos(dados.data);
                console.log(dados.data);
              })
              .catch(err => console.error(err));  
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
                <Text style={styles.titulo} >Ranking</Text>

               <View style={{marginTop : 10,
                 marginBottom : 30, 
                 marginLeft :4,
                 marginRight : 4,
                 display : 'flex',
                 justifyContent : 'flex-start',
                 alignItems : 'center',
                 flexDirection : 'row',
                backgroundColor : '#9200d6',
                height : 62, 
                width : '90%',
                borderRadius : 400,
                alignSelf : 'center'}}>
                  <Image
                    style = {{height : 55, width : 55, borderRadius : '100%', marginLeft : 3}}
                    resizeMode = "cover"
                    source={{uri : 'https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png'}}
                />                                
                  <View style={{marginLeft : 45, color : '#fff'}}>
                  <Text style={{fontSize : 20, fontWeight : 800, color : '#fff'}}>{nome}</Text>
                  <Text style={{fontSize : 15, color : '#fff'}}>Desenvolvimente de sistemas</Text>
                  </View>
                </View>
               <View style={{width : '100%', height : 500}}>
                <View
                  style={{
                    height: '35%',
                    width : '40%',
                    borderRadius : '100%',
                    backgroundColor : "#00d65f",
                    alignSelf : 'center'
                  }}
                  >
                  <View style={{display: 'flex', height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                    {
                        objConcluidos.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = cont + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {item.posicao}
                              º
                              </Text>
                            )
                            
                          }
                          else if(objConcluidos.length == (index+1) && cont == 0){
                            let soma = parseInt(item.posicao) + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {soma}
                              º
                              </Text>
                            ) 
                          }
                        })
                      }

{
                      objConcluidos.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = 22;
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                {item.pontos}</Text>
                            )
                          }else if(objConcluidos.length == (index+1) && cont != 22){
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                0</Text>
                            ) 
                          }
                        })
                      }
                    <Text style={{fontSize : 15, color : '#fff'}}>Objetivos</Text>
                    <Text style={{fontSize : 15, color : '#fff'}}>Concluídos</Text>
                  </View>
                  </View>  
                    <View
                    style={{
                      display : 'flex',
                      flexDirection : 'row',
                      height: '100%',
                      width : '100%',
                      justifyContent : 'space-between',
                      alignItems : 'center',
                      position : 'absolute',
                      top : -28,
                      

                    }}
                    >
                          <View
                        style={{
                          height: '35%',
                          width : '40%',
                          borderRadius : '100%',
                          backgroundColor : "#00c2ee"
                        }}
                        >
                          <View style={{display: 'flex', height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                    
                    {
                        curtidas.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = cont + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {item.posicao}
                              º
                              </Text>
                            )
                            
                          }
                          else if(curtidas.length == (index+1) && cont == 0){
                            let soma = parseInt(item.posicao) + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {soma}
                              º
                              </Text>
                            ) 
                          }
                        })
                      }
                      
                    
                    {
                      curtidas.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = 22;
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                {item.pontos}</Text>
                            )
                          }else if(curtidas.length == (index+1) && cont != 22){
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                0</Text>
                            ) 
                          }
                        })
                      }
                    
                    <Text style={{fontSize : 15, color : '#fff'}}>Posts</Text>
                    <Text style={{fontSize : 15, color : '#fff'}}>Curtidos</Text>
                  </View>
                        </View>  
                        <View
                        style={{
                          height: '35%',
                          width : '40%',
                          borderRadius : '100%',
                          backgroundColor : "#f9e800"
                        }}
                        >
                          <View style={{display: 'flex', height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                          {
                        objOcultos.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = cont + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {item.posicao}
                              º
                              </Text>
                            )
                            
                          }
                          else if(objOcultos.length == (index+1) && cont == 0){
                            let soma = parseInt(item.posicao) + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {soma}
                              º
                              </Text>
                            ) 
                          }
                        })
                      }
                      
                    
                    {
                      objOcultos.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = 22;
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                {item.pontos}</Text>
                            )
                          }else if(objOcultos.length == (index+1) && cont != 22){
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                0</Text>
                            ) 
                          }
                        })
                      }
                    <Text style={{fontSize : 15, color : '#fff'}}>Segredos</Text>
                    <Text style={{fontSize : 15, color : '#fff'}}>encontrados</Text>
                  </View>
                        </View> 
                    </View> 
                  <View
                  style={{
                    height: '35%',
                    width : '40%',
                    borderRadius : '100%',
                    backgroundColor : "#ff271c",
                    alignSelf : 'center',
                    position : 'absolute',
                    top : 267
                  }}
                  >
                    <View style={{display: 'flex', height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                    
                      
                    {
                        notas.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = cont + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {item.posicao}
                              º
                              </Text>
                            )
                            
                          }
                          else if(notas.length == (index+1) && cont == 0){
                            let soma = parseInt(item.posicao) + 1;
                            return(
                              <Text style={{fontSize : 35, color : '#fff', fontWeight : 800}}>
                              {soma}
                              º
                              </Text>
                            ) 
                          }
                        })
                      }
                      
                    
                    {
                      notas.map((item, index)  => {
                          if(item.idUsuario === parseInt(id)){
                            cont = 22;
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                {item.pontos}</Text>
                            )
                          }else if(notas.length == (index+1) && cont != 22){
                            return(
                              <Text style={{fontSize : 25, color : '#fff', fontWeight : 600}}>
                                0</Text>
                            ) 
                          }
                        })
                      }
                    
                    <Text style={{fontSize : 15, color : '#fff'}}>Notas</Text>
                    <Text style={{fontSize : 15, color : '#fff'}}>Máximas</Text>
                  </View>
                  </View>  
               </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default Ranking;