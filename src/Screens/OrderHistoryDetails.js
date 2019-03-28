import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator, 
} from 'react-native';


import OHDetails from '../components/OHDetails';

class OrderHistoryDetails extends Component{
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
        this.makeRemoteRequest();    
    } 

    makeRemoteRequest = () => {    

        // const order_line = '6712,6713';

        let ids = this.props.navigation.getParam('orderline', 'no data');
        const order_line = ids.toString();

        const url = `http://128.199.225.144:8069/restapi/1.0/object/sale.order.line?ids=${order_line}&fields=['id','display_name','price_unit','product_uom_qty','discount','price_subtotal']`;
    
        this.setState({ loading: true });
        
        setTimeout(()=>{
            fetch(url)    
            .then(res => res.json())
            .then(res => {
                this.setState({                            
                    data: res["sale.order.line"],            
                    loading: false,            
                    refreshing: false        
                });
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

    // renderSeparator = () => {
    // return (
    //     <View
    //         style={{
    //         height: 1,
    //         marginHorizontal:20,
    //         backgroundColor: "#CED0CE",
    //         }}
    //     />
    //     );
    // };
    
    
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
                        <OHDetails
                            display_name = {item.display_name}
                            price_unit = {item.price_unit}
                            quantity={item.product_uom_qty}
                            sub_total={item.price_subtotal}
                            discount={item.discount}
                            
                        />
                    )} 
                    keyExtractor={(item, index) => ('key'+index)}
                    // ListHeaderComponent={this.renderHeader}
                    // stickyHeaderIndices={[0]}
                    ListFooterComponent={this.renderFooter}
                    // ItemSeparatorComponent={this.renderSeparator}
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

export default OrderHistoryDetails;