import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator, 
} from 'react-native';
import { withNavigation } from 'react-navigation';

import ProductDetails from '../components/ProductDetails';

class NewArrivals extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            data: [],
            offset: 0,
            limit: 10,
            error: 'Sorry data not found',
            refreshing: false,
        }
    }

    componentDidMount() {
        this.makeRemoteRequest();    
    } 

    makeRemoteRequest = () => {    

        const { offset, limit } = this.state;  

        // using api no. 7. get new arrival product list
        const url = `http://128.199.225.144:8069/restapi/1.0/object/product.template?domain=[('public_categ_ids','=',163),('qty_available','>',0)]&fields=['id','display_name','website_public_price','image_medium']&offset=${offset}&limit=${limit}`;
    
        this.setState({ loading: true });
        
        setTimeout(()=>{
            fetch(url)    
            .then(res => res.json())        
            .then(res => {
                this.setState({                            
                    data: offset === 0 ? res["product.template"] : [...this.state.data, ...res["product.template"]],            
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
              <Text style={{textAlign:'center'}}>Waiting for reloding...</Text>
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
    
    // handleloadmore in flatlist
    handleLoadMore = () => {
        this.setState({
          offset: this.state.offset + 10,
        //   page: this.state.page + 1
        }, () => {
          this.makeRemoteRequest();
        });
    };
    
    // main render function
    render({onPress} = this.props){

        return(
            <View style={styles.container}>
                
                <FlatList
                    style={{ 
                        // margin: 5 
                    }}
                    data={this.state.data}
                    numColumns={1}                    
                    renderItem={({item}) => (
                        <ProductDetails
                            title = {item.display_name}
                            price = {item.website_public_price}
                            image = {item.image_medium}
                            onPress={ () => this.props.navigation.navigate("Product_details", {id: item.id})}
                            // onPress={onPress}

                            
                        />
                    )} 
                    keyExtractor={(item, index) => index + 'key'}
                    // ListHeaderComponent={this.renderHeader}
                    // stickyHeaderIndices={[0]}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
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

export default withNavigation(NewArrivals);