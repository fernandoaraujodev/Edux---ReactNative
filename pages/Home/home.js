import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = () => {

    return(
        <View style={styles.container}>    
                <Text>Homeeeeeeee </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#9200D6',
        alignItems: 'center',
        justifyContent: 'center',
        
    }
})

export default Home;