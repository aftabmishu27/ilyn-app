import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import { Grid, Col } from "react-native-easy-grid";


const screen = Dimensions.get('window');

class ShippingAddressListData extends Component{
    render( { city, onPress } = this.props ){
        return(
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <Grid>
                        <Col 
                            style={{
                                // backgroundColor:'#bdbdbd'
                            }}                        
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress = {onPress}
                                style={{
                                    flex:1,
                                    // padding:5
                                }}
                            >
                            <View style={styles.colContainer}>
                                <Text>{ city }</Text>
                            </View></TouchableOpacity>
                        </Col>
                        <Col 
                            style={{
                                // backgroundColor:'#e0e0e0'
                            }}                        
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress = {()=>{alert('just clicked default')}}
                                style={{
                                    flex:1,
                                    // padding:5
                                }}
                            >
                            <View style={styles.colContainer}>
                                <Text>Set as default</Text>
                            </View></TouchableOpacity>
                        </Col>
                    </Grid>
                </View>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    listContainer:{
        height:screen.height/12,
        // backgroundColor:'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colContainer:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',

    }
});

export default ShippingAddressListData;