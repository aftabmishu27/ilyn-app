import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator, 
    AsyncStorage
} from 'react-native';
import { FAB } from 'react-native-paper';


import ShippingAddressListData from '../components/ShippingAddressListData';

import { 
    getChildsIdByUserId, 
    fetch_shipping_address_list_by_childs_id,
} from '../utils/api';

class ShippingAddressList extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: 'Sorry data not found',
            refreshing: false,
            data_not_found: false,
            user_child_ids: '',
            user_id: '',
            data_user_id: [],

            test_error: false,


        }
    }

    checkSavedUserData(){
        AsyncStorage.getItem('user_data').then((data) => {
            let parse = JSON.parse(data);
            // let email = parse["res.users"][0].login
            this.setState({
                // user_child_ids: parse["res.users"][0].child_ids,           
                user_child_ids: parse["res.users"][0].child_ids,
                user_id: parse["res.users"][0].id,           
            })
        })
    
    }

    componentDidMount() {
        // this.checkSavedUserData();
        // this.getUserChildsId();
        return this.makeRemoteRequest();   
    }

    

    getUserChildsId = () => {
        
        const id = this.props.navigation.getParam('user_id', 'no data');

        // api no 20 get user data
        const url = `http://128.199.225.144:8069/restapi/1.0/object/res.users/${id}?fields=['id','name','login','partner_id','child_ids']`;
    
        // this.setState({ loading: true });
        
        setTimeout(()=>{
            fetch(url)    
            .then(res => res.json())
            .then(res => {
                    this.setState({                            
                        data_user_id: res["res.users"][0],            
                        // loading: false,            
                        // refreshing: false        
                    });
                }
            )      
            .catch(error => {
                this.setState({ 
                    // error, loading: false, refreshing: false 
                
                });
            });
        }, 1500);  

    }

    makeRemoteRequest = () => {

        // this.getUserChildsId(); 

        // --------------------------------------------------------------

        // const partner_id = this.state.user_partner_id;            
        // const child_ids = "23960,23958,23964";
        // const child_ids = this.state.user_child_ids.toString();
        // const child_ids = this.props.navigation.getParam('child_ids', 'no data');

        const id = this.props.navigation.getParam('user_id', 'no data');

        // api no 20 get user data
        const url20 = `http://128.199.225.144:8069/restapi/1.0/object/res.users/${id}?fields=['id','name','login','partner_id','child_ids']`;

        // const child_ids = this.state.data_user_id.child_ids;
        // console.warn(child_ids);
        // const test_ids = "23964, 23960, 23975, 23973, 23958, 23966, 23965"

        // api no: 22. get shipping address list
        // const url = `http://128.199.225.144:8069/restapi/1.0/object/res.partner?ids=${test_ids}&fields=['id','name','phone','street','street2','city','state_id','zip']`;
    
        this.setState({ loading: true });
        
        setTimeout(()=>{
            fetch(url20)    
            .then(res => res.json())
            .then(res => {

                this.setState({                            
                    data_user_id: res["res.users"][0],            
                    loading: false,            
                    refreshing: false        
                });

                const child_ids = this.state.data_user_id.child_ids;

                // api no: 22. get shipping address list
                const url22 = `http://128.199.225.144:8069/restapi/1.0/object/res.partner?ids=${child_ids}&fields=['id','name','phone','street','street2','city','state_id','zip']`;

                fetch(url22)    
                .then(response => response.json())
                .then(response => {
                        this.setState({                            
                            data: response["res.partner"] ,            
                            loading: false,            
                            refreshing: false        
                        });
                })      
                .catch(error => {
                    this.setState({ error, loading: false, refreshing: false });
                }).done();
            })      
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false });
            }).done();
        }, 2000);  
    };

    // rendering footer in flatlist
    renderFooter = () => {
        // if (!this.state.loading) return <SearchBar placeholder="Type Here..." lightTheme round />;
        if (!this.state.loading) return null;

        // if(this.state.data_not_found){
        //     return(
        //         <View
        //             style={{
        //             flex:1,
        //             // marginTop:200,
        //             justifyContent:'center',
        //             alignItems:'center',
        //             paddingVertical: 200,
        //             // borderTopWidth: 1,
        //             // borderColor: "#CED0CE",
        //             // backgroundColor:'yellow'
        //             }}
        //         >
        //             <Text style={{textAlign:'center',color:'#ff1744', fontSize:18}}>Sorry data not found</Text>
        //         </View>
        //     )
        // }

        return (
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
              <ActivityIndicator animating color="#000" size="large" />
              <Text style={{textAlign:'center'}}>Wait for Loading ...</Text>
              <Text style={{textAlign:'center'}}>If not loaded data, plaese pull to refresh</Text>
          </View>
        );
    };
    
    // handlerefresh in flatlist
    handleRefresh = () => {
        this.setState({
          offset:0,
          refreshing: true,
          loading:false
        //   seed: this.state.seed + 1
    
        }, () => {
          this.makeRemoteRequest();
        });
    };

    renderSeparator = () => {
    return (
        <View
            style={{
            height: 1,
            marginHorizontal:10,
            backgroundColor: "#CED0CE",
            }}
        />
        );
    };
    
    
    // main render function
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    style={{ 
                        // margin: 5 
                    }}
                    data={this.state.data}
                    numColumns={1}                    
                    renderItem={({item}) => (
                        <ShippingAddressListData
                            city = {item.city}
                            onPress={ () => this.props.navigation.navigate("ShippingAddressDetails", {id: item.id})}
                        />
                    )} 
                    keyExtractor={(item, index) => ('key'+index)}
                    // ListHeaderComponent={this.renderHeader}
                    // stickyHeaderIndices={[0]}
                    ListFooterComponent={this.renderFooter}
                    ItemSeparatorComponent={this.renderSeparator}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />     

            {/*  <Text
                    onPress = { ()=>{
                        alert(JSON.stringify(this.state.data, null, 2));
                    }}
                >Click me</Text> */}

                <FAB
                    style={styles.fab}
                    medium
                    icon="add"
                    onPress={() => this.props.navigation.navigate("AddShippingAddress")}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
    },
});

export default ShippingAddressList;