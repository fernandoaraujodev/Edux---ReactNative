import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,  Image,  TouchableOpacity , StatusBar, SafeAreaView, ScrollView, TextInput, Platform} from 'react-native';
import { useFonts } from 'expo-font';
import {url} from '../../utils/constants';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import jwt_decode from "jwt-decode";


const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : StatusBar.currentHeight || 0
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

      ,
  buttonStyle: {
    backgroundColor : 'black',
    borderWidth: 0,
    height: 45,
    width :170,
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 10
  },
  buttonTextStyle: {
    padding: 10,
    fontSize: 17,
    textAlign : 'left',
    color : '#fff'
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
      imagem : {
        flex : 1,
        height: 330,
        width: '90%',
        alignSelf : 'center',
        padding : 10,
        resizeMode: 'cover'
    },
    scroll : {
        flex : 1,
        marginTop : StatusBar.currentHeight || 0,
        marginBottom : 14,
        backgroundColor : '#fff'
      },
    
})


const Ranking = ( {navigation}) => {
    
    const [dica, setDica] = useState([]);
    const [image, setImage] = useState(null);
    const [token, setToken] = useState('');
    const [value, onChangeText] = React.useState('Qual sua dica para hoje?');
    let data = new Date();
    let dia = data.getDate();            // 0-6 (zero=domingo)
    let mes = data.getMonth();          // 0-11 (zero=janeiro)
    let ano = data.getFullYear();          

    let dataHoje = dia + '/' + (mes+1) + '/' + ano;

    let [fontsLoaded] = useFonts({
        'OpenSans-Light': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      });

    useEffect(() =>{
        getToken();
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
              if (status !== 'granted') {
                alert('Desculpe, é necessário sua permissão para acessar a câmera!');
              }
            }
          })();
    }, []);


    const Logout = () => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
    }

    const getToken = async () => {
        let token = await AsyncStorage.getItem('@jwt');
        setToken(token);

        fetch(`${url}/Dica`, {
            method : "GET",
            headers : {
                'authorization' : 'Bearer ' + token
            }
          })
            .then(response => response.json())  
            .then(dados => {

                setDica(dados.data);
            })
            .catch(err => console.error(err));
        
    }

    const selectFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

      
          if (!result.cancelled) {
              
              setImage(result.uri);
          }
    };

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}
    const curtir = (idDica ) => {
    let idUser = jwt_decode(token);

    let curtida = {
        idUsuario : parseInt(idUser.family_name), 
        idDica : idDica
    }

    console.log(curtida);
    console.log('aaaa');

    // fetch(`${url}/Dica`, {
    //     method : "POST",
    //     body : formdata,
    //     headers : {
    //         'authorization' : 'Bearer ' + token
    //     }
    // })
    // .then(response => response.json())
    // .then(dados => {
    //     alert('Dica salva');

    //     setImage(null);
    //     onChangeText('Qual a dica para hoje?'); 
    //     getToken();
    // })
    // .catch(err => console.error(err))
}

    const uploadImagem = async () => {
        let token = await AsyncStorage.getItem('@jwt');
        let idUser;
        idUser = jwt_decode(token);
        let formdata = new FormData();


        formdata.append("IdUsuario", idUser.family_name);
        formdata.append("Texto", value);

        var block = image.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = b64toBlob(realData, contentType);

        formdata.append("Img", blob);

        fetch(`${url}/Dica`, {
            method : "POST",
            body : formdata,
            headers : {
                'authorization' : 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Dica salva');

            setImage(null);
            onChangeText('Qual a dica para hoje?'); 
            getToken();
        })
        .catch(err => console.error(err))
    };

    return( 
        <SafeAreaView style={styles.scroll}>
      <ScrollView>
        <View>
             <View style={styles.MenuSuperior}>
                    <Text style={styles.tituloSuperior}>Edux</Text>
                    <TouchableOpacity onPress={Logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size={34} color="#fff" />
                    </TouchableOpacity>
                </View> 
                <View style={{ alignItems: 'center' }}>
            </View>
            <Text style={styles.titulo} >POSTAGENS</Text> 
            <TouchableOpacity>
                <TextInput
                clearTextOnFocus = {true}
                style={{
                    height: '9%',
                    marginTop : 25,
                    marginBottom : 5,
                    borderRadius : 8,
                    width : '85%', 
                    paddingLeft : 15,
                    paddingTop : 35,
                    paddingBottom : 35,
                    alignSelf : 'center', 
                    color : '#9099a9', height: 40, borderColor: '#9200d6', borderWidth: 1 
                }}
                onChangeText={text => onChangeText(text)}
                value={value}
                />
            </TouchableOpacity>
                
            <View style={{alignSelf : 'center', width : '85%', display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection : 'row'}}>
                        
            <TouchableOpacity
                    style ={{
                    backgroundColor : '#bbbbbb',
                    borderWidth: 0,
                    height: 45,
                    width :'50%',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginTop: 10,
                    marginBottom: 10}}
                    activeOpacity={0.5}
                    onPress={selectFile}>
                    <Text style={styles.buttonTextStyle}>Escolher imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity
                     style ={{
                        backgroundColor : '#00d65f',
                        borderWidth: 0,
                        height: 45,
                        width :'44%',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginTop: 10,
                        marginBottom: 10}}
                    activeOpacity={0.5}
                    onPress={uploadImagem}
                    >
                        <Text 
                        
                        style={{fontWeight : 800, padding: 10,
                        fontSize: 20,
                        textAlign : 'center',
                        color : '#fff'}}>POSTAR</Text>
                </TouchableOpacity>

            </View>
            {image && <Image source={{ uri: image }} style={{ width: '85%', height: 200, alignSelf : 'center', borderRadius : 10, resizeMode : 'cover'}} />}

            {
                dica.map((item, index) => {

                   if(item.imagem === undefined){
                       return(
                        <View style={{flex : 1, marginTop: 25, width : '85%', height : 500, border: 1, borderColor: '#00c2ee',
                        borderStyle:'solid', alignSelf: "center", borderRadius: 7}} key={index}>
                            <View style={{height : '83%', width : '100%', marginTop: 28, display: 'flex', flexDirection : 'column', justifyContent : 'center', alignItems: 'center', paddingTop : 2, paddingLeft : 20, paddingRight: 20, paddingBottom : 10}}>
                                <Image 
                                style={{
                                    flex : 1,
                                    height : 100,
                                    borderRadius : 7,
                                    width : '100%',
                                    resizeMode : 'cover'
                                }}
                                source={require('../../assets/splash.png')} />
                                <Text style={{marginTop: 30, textAlign: 'justify'}}>{item.texto}</Text>
                            </View>
                            <View style={{display: 'flex', width: '100%', paddingLeft : 20, paddingRight: 20,
                            flexDirection: 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                                <View  style={{display: 'flex', alignItems: 'center', justifyContent : 'center', flexDirection: 'row'}}>
                                    <TouchableOpacity
                                    onPress = {() => curtir(item.idDica)}
                                    activeOpacity={0.5}
                                    > 
                                    <Icon name="heart" size={23} color="#00c2ee" />
                                    </TouchableOpacity>
                                    <Text style={{color:"#00c2ee", fontSize: 22, fontWeight : 600, marginLeft : 5}}>{item.curtida.length}</Text>
                                </View>
                                <Text style={{color:"#00c2ee"}}>{dataHoje}</Text>
                            </View>
                        </View>
                       )
                   }else{
                       return(
                        <View style={{flex : 1, marginTop: 25, width : '85%',  height : 500, border: 1, borderColor: '#00c2ee',
                        borderStyle:'solid', alignSelf: "center", borderRadius: 7}}  key={index}>
                            <View style={{height : '83%', width : '100%', marginTop: 28, display: 'flex', flexDirection : 'column', justifyContent : 'center', alignItems: 'center', paddingTop : 2, paddingLeft : 20, paddingRight: 20, paddingBottom : 10}}>
                                <Image 
                                style={{
                                    flex : 1,
                                    height : 150,
                                    borderRadius : 7,
                                    width : '100%',
                                    resizeMode : 'cover'
                                }}
                                source={{
                                    uri: item.imagem,
                                  }} />
                                <Text style={{marginTop: 30, textAlign: 'justify'}}>{item.texto}</Text>
                            </View>
                            <View style={{display: 'flex', width: '100%', paddingLeft : 20, paddingRight: 20,
                            flexDirection: 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                                <View  style={{display: 'flex', alignItems: 'center', justifyContent : 'center', flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress = {() => curtir(item.idDica)}
                                    activeOpacity={0.5}
                                    > 
                                    <Icon name="heart" size={23} color="#00c2ee" />
                                    </TouchableOpacity>
                                    <Text style={{color:"#00c2ee", fontSize: 22, fontWeight : 600, marginLeft : 5}}>{item.curtida.length}</Text>
                                </View>
                                <Text style={{color:"#00c2ee"}}> {dataHoje} </Text>
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

export default Ranking;
