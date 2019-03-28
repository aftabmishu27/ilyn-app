import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, AsyncStorage } from 'react-native';
import { List, Divider, Button } from 'react-native-paper';

const screen = Dimensions.get('window');


class Profile extends Component{

    constructor(props){
        super(props)
        this.state = { 
            id:'',
            name:'',
            email:'',
        }
    }

    checkSavedUserData(){
        AsyncStorage.getItem('user_data').then((data) => {
            let parse = JSON.parse(data);
            // let email = parse["res.users"][0].login
            this.setState({
                name: parse["res.users"][0].name,
                email: parse["res.users"][0].login            
            })
        })
    
    }

    componentDidMount(){
        this.checkSavedUserData();
    }

    render(){

        // this datas fetching from account using navigation param
        const id = this.props.navigation.getParam('id', 'no data');
        const name = this.props.navigation.getParam('name', 'no data');
        const email = this.props.navigation.getParam('email', 'no data');

        return(
            <View style={styles.container}>
                
                <Text style={{padding: 10,fontSize:16, alignSelf:'center'}} >PERSONAL INFORMATION</Text>
                <Divider/>
                <List.Section
                    style={{
                        marginLeft:30
                    }}
                >
                    {/* user name */}
                    <List.Item
                        title={this.state.name}
                    />
                    <Divider/>

                    {/* user email */}
                    <List.Item
                        title={this.state.email}
                    />
                    <Divider/>

                </List.Section>
                <View
                    style={{
                        height:screen.height/10,
                        width:screen.width,
                        // backgroundColor:'red',
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'row'
                    }}
                >
                    <Button 
                        mode="contained" 
                        // onPress={() => this.props.navigation.pop()}
                        onPress={() => this.props.navigation.navigate("EditProfile",{id:id, name:name, email:email })}
                        uppercase={false}
                        style={{
                            // width:screen.width/3,
                            marginRight:'2%',
                            backgroundColor:'#000000'
                        }}
                    >
                        <Text
                            style={{fontSize:14}}
                        >Edit Profile</Text>
                    </Button>

                    <Button 
                        mode="contained" 
                        // onPress={() => this.props.navigation.pop()}
                        onPress={() => this.props.navigation.navigate("ChangePassword",{ id:id, email:email })}
                        uppercase={false}
                        style={{
                            // width:screen.width/3,
                            marginLeft:'2%',
                            backgroundColor:'#000000'
                        }}
                    >
                        <Text
                            style={{fontSize:14}}
                        >Change Password</Text>
                    </Button>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
});

export default Profile;