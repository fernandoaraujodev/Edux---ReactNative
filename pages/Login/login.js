import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity, Image} from 'react-native';

//Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    // Hooks
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    
const salvarToken = async (value) => {
    try {
      await AsyncStorage.setItem('@jwt_nyous', value)
    } catch (e) {
      // saving error
    }
}
    const Logar = ({navigation}) =>{
        const corpo = {
            email : email,
            senha : senha
        }
        fetch('http://172.17.62.161/api/Login',{ //ip SENAI + endpoint Edux_API
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(corpo)
        })        
        .then(response => response())
        .then(data => {
            if(data.status != 404){
                alert('Login efetuado');
                salvarToken(data.token);
                navigation.push('Autenticado');
            }else{
                alert('Dados inválidos')
            }
        })
        .catch(() => alert('Falha na requisição, tente novamente'))
        
    }

    return(
        <View style={styles.container}>
            
            
            <Text style={styles.logo }>EduX</Text>
            <Text style={styles.text }>LOGIN</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholderTextColor= '#9200d6'
                placeholder='Email'
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                secureTextEntry={true}
                placeholderTextColor= '#9200d6'
                placeholder='Senha'
            />
            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.buttonText}>
                    ENTRAR
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#9200D6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input : {
        backgroundColor: 'white',
        marginTop: 10,
        width: '75%',
        height: 40, 
        borderColor:'#9200d6',   
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        color: '#9200d6'
    },
    button : {
        width:'75%',
        textAlign:'center',
        borderRadius: 6,
        marginTop: 25,
        height: 40, 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText : {
        color: '#9200d6',     
        fontWeight : 'bold',
    },
    text : {
        color: 'white',
        fontWeight : 'bold',
        fontSize : 15,
        marginBottom: 10
    },
    logo : {
        color: 'white',
        fontWeight : 'bold',
        fontSize: 90,
        marginBottom: 20
    },
    image:{
        width: 80,
        height: 80,
    }
})

export default Login;