import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator, 
    AsyncStorage
} from 'react-native';


import OrderHistoryList from '../components/OrderHistoryList';

class OrderHistory extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: 'Sorry data not found',
            refreshing: false,
            data_not_found: false,
            user_partner_id: '',
        }
    }

    checkSavedUserData(){
        AsyncStorage.getItem('user_data').then((data) => {
            let parse = JSON.parse(data);
            // let email = parse["res.users"][0].login
            this.setState({
                user_partner_id: parse["res.users"][0].partner_id,           
            })
        })
    
    }

    componentDidMount() {
        this.makeRemoteRequest();    
        this.checkSavedUserData();
    } 

    makeRemoteRequest = () => {    

        // const partner_id = this.state.user_partner_id;
        const partner_id = 23967;

        const url = `http://128.199.225.144:8069/restapi/1.0/object/sale.order?domain=[('partner_id','=',${partner_id})]&fields=['id','date_order','cart_quantity','amount_total','invoice_status','order_line']`;
    
        this.setState({ loading: true });
        
        setTimeout(()=>{
            fetch(url)    
            .then(res => res.json())
            .then(res => {

                if(typeof(res.code) !== "undefined"){
                    this.setState({
                        data_not_found: true,
                        loading: false,            
                        refreshing: false   
                    })
                }else{
                    this.setState({                            
                        data: res["sale.order"] ,            
                        loading: false,            
                        refreshing: false        
                    });
                }
            })      
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false });
            });
        }, 1500);  
    };

    // rendering footer in flatlist
    renderFooter = () => {
        // if (!this.state.loading) return <SearchBar placeholder="Type Here..." lightTheme round />;
        if (!this.state.loading) return null;

        if(this.state.data_not_found){
            return(
                <View
                    style={{
                    flex:1,
                    // marginTop:200,
                    justifyContent:'center',
                    alignItems:'center',
                    paddingVertical: 200,
                    // borderTopWidth: 1,
                    // borderColor: "#CED0CE",
                    // backgroundColor:'yellow'
                    }}
                >
                    <Text style={{textAlign:'center',color:'#ff1744', fontSize:18}}>Sorry data not found</Text>
                </View>
            )
        }
    
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
              <ActivityIndicator animating size="large" />
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
                        <OrderHistoryList
                            order_id = {item.id}
                            order_date = {item.date_order}
                            amount_total = {item.amount_total}
                            status = {item.invoice_status}
                            order_line={item.order_line}
                            onPress={ () => this.props.navigation.navigate("OrderHistoryDetails", {orderline: item.order_line})}

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
    }
});

export default OrderHistory;