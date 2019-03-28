// import React, { Component } from 'react';
// import { StyleSheet, View, Text } from 'react-native';


// class Account extends Component{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <Text 
//                     style={{
//                         fontSize:30
//                     }}
//                     onPress = { ()=>{
//                         // let value = this.props.navigation.getParam('name', 'no data')
//                         // alert(JSON.stringify(value));
//                         alert('hello mishu');
//                     }}
//                 >This is Profile Account</Text>
//                 <Text 
//                     style={{
//                         fontSize:25,
//                         color:'#ba000d'
//                     }}
//                     // onPress = {()=>{
//                     //     alert('hello world');
//                     // }}
//                     // onPress={() => this.props.navigation.pop()}
//                 >Log out</Text>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     }
// });

// export default Account;

import * as React from 'react';
import { View, Dimensions, Text, AsyncStorage } from 'react-native';
import { List, Divider, Appbar, Button } from 'react-native-paper';

const screen = Dimensions.get('window');

export default class Account extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user_partner_id:'',
            user_child_ids: '',
            user_id:'',
        }
    }

    _onSearch = ()=>{
        alert('hello cart');
    }
    
    checkSavedUserData(){
        AsyncStorage.getItem('user_data').then((data) => {
            let parse = JSON.parse(data);
            // let email = parse["res.users"][0].login
            this.setState({
                user_partner_id: parse["res.users"][0].partner_id,
                user_child_ids:  parse["res.users"][0].child_ids.toString(), 
                user_id: parse["res.users"][0].id,     
            })
        })
    
    }

    componentDidMount() { 
        this.checkSavedUserData();
    } 

    render() {
        // catching login user data from login
        let value = this.props.navigation.getParam('name', 'no data');
        const id = value["res.users"][0].id;
        const name = value["res.users"][0].name;
        const email = value["res.users"][0].login;

        return (
            <View
                style={{
                    flex:1,
                }}
            >   
                <Appbar.Header
                    style={{
                        backgroundColor:'#ffffff'
                    }}
                >
                    <Appbar.Content
                        title="Account"
                    />
                    <Appbar.Action 
                        icon="shopping-cart" 
                        onPress={this._onSearch} 
                        size={30}
                    />
                </Appbar.Header>
                
                <List.Section 
                    // title={value["res.users"][0].login}
                    title={email}

                    style={{
                        // borderBottomWidth:1,
                        // borderBottomColor:'#000000'
                    }}
                    
                >
                    <Divider/>
                    <List.Item
                        title="Your Profile"
                        // onPress={()=>{alert('hello profile')}}
                        // onPress= {()=>{
                        //     let value = this.props.navigation.getParam('name', 'no data')
                        //     alert(JSON.stringify(value["res.users"][0].name));
                        // }}
                        onPress={() => this.props.navigation.navigate("Profile",{id:id, name:name, email:email})}
                    />
                    <List.Item
                        title="Order History"
                        // onPress={()=>{alert('hello order history')}}
                        onPress={() => this.props.navigation.navigate("OrderHistory")}
                    />
                    <List.Item
                        title="Point History"
                        // onPress={()=>{alert('hello point history')}}  PointHistory
                        onPress={() => this.props.navigation.navigate("PointHistory", {partner_id:this.state.user_partner_id})}
                    />
                    <List.Item
                        title="Shipping Address"
                        onPress={()=> this.props.navigation.navigate("ShippingAddressList", {child_ids: this.state.user_child_ids, user_id: this.state.user_id })}
                    />
                    <List.Item
                        title="Help"
                        onPress={()=>{alert('hello help')}}
                    />
                    <List.Item
                        title="Returns"
                        onPress={()=>{alert('hello returns')}}
                    />
                    <Divider/>
                </List.Section>
                <View
                    style={{
                        height:screen.height/10,
                        width:screen.width,
                        // backgroundColor:'red',
                        justifyContent:'center',
                        alignItems:'flex-end'
                    }}
                >
                    <Button 
                        mode="contained" 
                        onPress={() => {
                            AsyncStorage.clear();
                            return this.props.navigation.pop();                        
                        }}
                        uppercase={false}
                        style={{
                            width:screen.width/3,
                            marginRight:'5%',
                            backgroundColor:'#000000'
                        }}
                    >
                        <Text
                            style={{fontSize:16}}
                        >Log Out</Text>
                    </Button>
                </View>
            </View>
        );
    }
}