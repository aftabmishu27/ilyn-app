import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class Clothing extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text 
                    style={{
                        fontSize:30
                    }}
                >This is Clothing screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Clothing;