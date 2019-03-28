import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { List, Divider, Button } from 'react-native-paper';

const screen = Dimensions.get('window');


class ShippingAddressDetails extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: 'Sorry data not found',
            refreshing: false,
        }
    }

    componentDidMount() {
       return this.makeRemoteRequest();    
    } 

    makeRemoteRequest = () => {    

        // const order_line = '6712,6713';

        let shipping_address_id = this.props.navigation.getParam('id', 'no data');
        // const order_line = ids.toString();

        const url = `http://128.199.225.144:8069/restapi/1.0/object/res.partner?ids=${shipping_address_id}&fields=['id','name','phone','street','street2','city','state_id','zip']`;
    
        this.setState({ loading: true });
        
        setTimeout(()=>{
            fetch(url)    
            .then(res => res.json())
            .then(res => {
                this.setState({                            
                    data: res["res.partner"][0],            
                    loading: false,           
                });
            })      
            .catch(error => {
                this.setState({ error, loading: false});
            });
        }, 1500);  
    };

    handleDeleteRequest(id){
        // const id = this.state.data.id;
        // console.warn(id);
        const url = `http://128.199.225.144:8069/restapi/1.0/object/res.partner/${id}`;
        
        setTimeout(()=>{
            fetch(url,{
                method: 'DELETE',
            })    
            .then(res => res.json())
            .then(res => {

            })      
            .catch(error => {
                this.setState({ error, loading: false});
            });
        }, 1000);  
    }

    

    render(){

        // this datas fetching from account using navigation param
        // const id = this.props.navigation.getParam('id', 'no data');
        // const name = this.props.navigation.getParam('name', 'no data');
        // const email = this.props.navigation.getParam('email', 'no data');

        if (this.state.loading){
            return(
                <View
                    style={{
                    flex:1,
                    // marginTop:200,
                    justifyContent:'center',
                    alignContent:'center',
                    paddingVertical: 50,
                    // borderTopWidth: 1,
                    // borderColor: "#CED0CE",
                    // backgroundColor:'yellow'
                    }}
                >
                    <ActivityIndicator animating size="large" />
                    <Text style={{textAlign:'center'}}>Wait for Loading ...</Text>
                </View>
            );
        }

        return(
            <ScrollView>
            <View style={styles.container}>

                <List.Section
                    style={{
                        marginHorizontal:30
                    }}
                >
                    {/* name */}
                    <List.Item
                        // title={this.state.name}
                        // title={this.state.data.name}
                        title={`Name : ${this.state.data.name}`}
                    />
                    <Divider/>

                    {/* address 1 */}
                    <List.Item
                        // title={this.state.data.street}
                        title={`Address 1 : ${this.state.data.street}`}
                    />
                    <Divider/>

                    {/* address 2 */}
                    <List.Item
                        // title={this.state.data.street2}
                        title={`Address 2 : ${this.state.data.street2}`}
                    />
                    <Divider/>

                    {/* city */}
                    <List.Item
                        // title={this.state.data.city}
                        title={`City : ${this.state.data.city}`}
                    />
                    <Divider/>
                    {/* state */}
                    <List.Item
                        // title={this.state.data.state_id}
                        title={`State code : ${this.state.data.state_id}`}
                    />
                    <Divider/>

                    {/* zip code */}
                    <List.Item
                        title={`Zip code: ${this.state.data.zip}`}
                    />
                    <Divider/>

                    {/* Phone */}
                    <List.Item
                        title={`Phone : ${this.state.data.phone}`}
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
                        flexDirection:'row',
                        marginLeft:80
                    }}
                >
                    <Button 
                        mode="contained" 
                        // onPress={() => this.props.navigation.pop()}
                        // onPress={() => this.props.navigation.navigate("EditProfile",{id:id, name:name, email:email })}
                        onPress={ () => this.props.navigation.navigate("EditShippingAddress", {id: this.state.data.id})}
                        uppercase={false}
                        style={{
                            // width:screen.width/3,
                            marginRight:'2%',
                            backgroundColor:'#000000'
                        }}
                    >
                        <Text
                            style={{fontSize:14}}
                        >Edit</Text>
                    </Button>

                    <Button 
                        mode="contained" 
                        // onPress={() => this.props.navigation.pop()}
                        onPress={() => {
                            setTimeout(()=>{
                                this.handleDeleteRequest(this.state.data.id);
                                alert("successfully deleted shipping address");
                                return this.props.navigation.navigate('ShippingAddressList');
                            }, 2000);
                        }}
                        uppercase={false}
                        style={{
                            // width:screen.width/3,
                            marginLeft:'2%',
                            backgroundColor:'#000000'
                        }}
                    >
                        <Text
                            style={{fontSize:14}}
                        >Delete</Text>
                    </Button>


                </View>
            </View>
            </ScrollView>
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

export default ShippingAddressDetails;