import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, StatusBar, Dimensions } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, Left, Right, Body, Title } from 'native-base';
import { Searchbar } from 'react-native-paper';
import { Grid, Col, Row } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons';

import NewArrivals from '../Screens/NewArrivals';
import Clothing from '../Screens/Clothing';
import Accessories from '../Screens/Accessories';
import Footware from '../Screens/Footware';
import Clearance from '../Screens/Clearance';

const screen = Dimensions.get('window');



import ProductDetails from '../components/ProductDetails';


class Shop extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstQuery: '',
        }
    }
      
    render(){
        return(
            <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,}} >
            {/*    <Tabs 
                    renderTabBar={
                        ()=> <ScrollableTab />
                    }
                >
                    <Tab heading="NEW ARRIVALS">
                        <NewArrivals />
                    </Tab>
                    <Tab heading="CLOTHING">
                        <Clothing />
                    </Tab>
                    <Tab heading="ACCESSORIES">
                        <Accessories />
                    </Tab>
                    <Tab heading="FOOTWARE">
                        <Footware />
                    </Tab>
                    <Tab heading="CLEARANCE">
                        <Clearance />
                    </Tab>
                </Tabs> */}

                <Header
                    noShadow
                    style={{ backgroundColor:'#fff'}}
                >
                {/*    <Body style={{flex:1, marginTop:5}}>
                    <Searchbar
                        placeholder="Search Products"
                        onChangeText={query => { this.setState({ firstQuery: query }); }}
                        value={this.state.firstQuery}
                        style={{width:'80%'}}
                    />
                    </Body> */} 
                    <Grid 
                        style={{
                            flex:1, 
                            // backgroundColor:'yellow',
                            marginTop:5
                        }}                   
                    >
                        <Col  
                            style={{
                                // backgroundColor:'green', 
                                width:'80%', 
                                justifyContent:'center', 
                                alignItems:'center'
                            }}
                        >
                            <Searchbar
                                placeholder="Search Products"
                                onChangeText={query => { this.setState({ firstQuery: query }); }}
                                value={this.state.firstQuery}
                                style={{width:'90%', borderWidth:1, borderColor:'#000000'}}
                            />
                        </Col>
                        <Col 
                            style={{
                                // backgroundColor:'red',
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

                </Header>
                            
                {/* customisable tabs */}
                <Tabs 
                    tabBarUnderlineStyle={{borderBottomWidth:2, borderBottomColor:'#000'}}
                    renderTabBar={
                        ()=> <ScrollableTab />
                    }

                >
                    <Tab 
                        heading="NEW ARRIVALS" 
                        tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000', fontSize:14}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'bold', fontSize:14}}             
                    >
                        <NewArrivals />
                    </Tab>
                    
                    <Tab heading="CLOTHING" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000', fontSize:14}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'bold', fontSize:14}}>
                        <Clothing />
                    </Tab> 

                    <Tab heading="ACCESSORIES" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000', fontSize:14}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'bold', fontSize:14}}>
                        <Accessories />
                    </Tab> 

                    <Tab heading="FOOTWARE" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000', fontSize:14}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'bold', fontSize:14}}>
                        <Footware />
                    </Tab> 

                    <Tab heading="CLEARANCE" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000', fontSize:14}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'bold', fontSize:14}}>
                        <Clearance />
                    </Tab> 
                </Tabs>
            </Container>
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

export default Shop;

