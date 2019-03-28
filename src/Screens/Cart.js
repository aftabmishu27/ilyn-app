import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { Card } from 'react-native-elements'

import { Constants, SQLite } from 'expo';

var db = SQLite.openDatabase('UserDatabase.db');  

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
        };
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_cart', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
                    // temp = [...results.rows.item(i)];
                }
                this.setState({
                    FlatListItems: temp,
                });
            });
        });
    }

    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.5, width: '100%', backgroundColor: '#808080' }} />
        );
    };

    render(){
        console.log( JSON.stringify(this.state.FlatListItems));
        return(   
            <View>
                <FlatList
                    data={this.state.FlatListItems}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View key={item.id} style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Product_id: {item.product_id}</Text>
                            <Text>Name: {item.product_name}</Text>
                            <Text>Price: {item.product_price}</Text>
                        </View>
                    )}
                />
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

export default Cart;


// https://github.com/Kishanjvaghela/react-native-cardview/blob/master/example/Example1.js