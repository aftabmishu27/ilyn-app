import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    Dimensions, 
    Image, 
    ActivityIndicator, 
    Platform, 
    StatusBar 
} from 'react-native';
import { Grid, Col } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import ProductDetails from '../components/ProductDetails';

const screen = Dimensions.get('window');

class Home extends Component{
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

    // componentDidMount() {
    //     this.makeRemoteRequest();    
    // } 

    // makeRemoteRequest = () => {    

    //     const { offset, limit } = this.state;  

    //     // using api no:8. get featured product list
    //     const url = `http://128.199.225.144:8069/restapi/1.0/object/product.template?domain=[('public_categ_ids','=',164),('qty_available','>',0)]&fields=['id','display_name','website_public_price','image_medium']&offset=${offset}&limit=${limit}`;
    //     // const url = `https://randomuser.me/api/?seed=1&page=1&results=4`;
    
    //     this.setState({ loading: true });
        
    //     setTimeout(()=>{
    //         return fetch(url)    
    //         .then(res => res.json())        
    //         .then(res => {
    //             this.setState({                            
    //                 data: offset === 0 ? res["product.template"] : [...this.state.data, ...res["product.template"]],            
    //                 loading: false,            
    //                 refreshing: false        
    //             });
    //         })    
    //         .catch(error => {
    //             this.setState({ error, loading: false, refreshing: false });
    //         });
    //     }, 1500);  
    // };


    // ------------------- testing api with async await function only ---------------------------

    componentDidMount() {
        this.makeRemoteRequest();    
    }    


    makeRemoteRequest = async () => {    

        const { offset, limit } = this.state;   
        const base_url = 'http://128.199.225.144:8069/restapi/1.0';

        // using api no:8. get featured product list
        const url = `${base_url}/object/product.template?domain=[('public_categ_ids','=',164)]&fields=['id','display_name','website_public_price','image_medium']&offset=${offset}&limit=${limit}`;
        // const url = `https://randomuser.me/api/?seed=1&page=1&results=4`;    
        
        this.setState({ loading: true });

        try{
            const res = await fetch(url);
            const resJson = await res.json();
            this.setState({                            
                data: offset === 0 ? resJson["product.template"] : [...this.state.data, ...resJson["product.template"]],            
                loading: false,            
                refreshing: false        
            }); 
        } catch (error ){
            console.warn(error);
        }
        
    };

    // ---------------------------- api testing with axios purpose only ---------------------------

    // componentDidMount() {
    //     this.makeRemoteRequest();    
    // }    

    // makeRemoteRequest = () => {    

    //     const { offset, limit } = this.state; 
        
    //     this.setState({ loading: true });

    //     // using api no:8. get featured product list
    //     const url = `http://128.199.225.144:8069/restapi/1.0/object/product.template?domain=[('public_categ_ids','=',164),('qty_available','>',0)]&fields=['id','display_name','website_public_price','image_medium']&offset=${offset}&limit=${limit}`;
    //     // const url = `https://randomuser.me/api/?seed=1&page=1&results=4`;    
        
    //     axios.get(url)
    //     .then(function (response) {
    //         this.setState({                            
    //             data: offset === 0 ? response["product.template"] : [...this.state.data, ...response["product.template"]],            
    //             loading: false,            
    //             refreshing: false        
    //         }); 
    //     })
    //     .catch(function (error) {
    //         console.warn(error);
    //     });
        
    // };

    // -----------------------------------------------------------------------------------

    // rendering header in flatlist
    renderHeader = () => {
        return(
            <Grid
                style={{
                    flex:1,
                    height: screen.height /10,
                    backgroundColor:'#e2e2e2'
                }}
            >
                <Col style={{ 
                        width:'30%', 
                        // backgroundColor:'red', 
                        flex:1, 
                        justifyContent:'center', 
                        alignItems:'center',
                       
                    }} 
                >
                    <Image
                        source={require('../images/logo.png')}
                        style={{
                            width:screen.width/6,
                            height:screen.height/6
                        }}
                        resizeMode='contain'
                    />
                </Col>
                <Col style={{ 
                        width:'40%', 
                        // backgroundColor:'green'
                    }} 
                ></Col>
                <Col style={{ 
                        width:'30%', 
                        // backgroundColor:'red',
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                    }} 
                >
                    <Icon
                        name={'shopping-cart'}
                        size={40}
                        style={{ color: '#000000',  paddingLeft: '30%', }}
                    />
                </Col>
            </Grid>
        );
    }

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
    render(){
        const data = this.state.data;
        return(
            <View style={styles.container}>
                
                <FlatList
                    style={{ 
                        // margin: 5 
                    }}
                    data={data}
                    numColumns={1}                    
                    renderItem={({item}) => (
                        <ProductDetails
                            title = {item.display_name}
                            price = {item.website_public_price}
                            image = {item.image_medium}
                            onPress={ () => this.props.navigation.navigate("Product_details", {id: item.id})}
                        />
                    )} 
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderHeader}
                    stickyHeaderIndices={[0]}
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
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    }
});

export default Home;


// import * as React from 'react';
// import { Card, Title, Paragraph } from 'react-native-paper';

// const MyComponent = () => (
//   <Card>
//     <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
//     <Card.Content>
//       <Title>Platinum Panjabi - 192021</Title>
//       <Paragraph>&#x9f3; 1234</Paragraph>
//     </Card.Content>    
//   </Card>
// );

// export default MyComponent;