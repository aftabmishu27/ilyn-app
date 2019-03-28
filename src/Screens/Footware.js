import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class Footware extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text 
                    style={{
                        fontSize:30
                    }}
                >This is Footware screen</Text>
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

export default Footware;