// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  * src:  https://github.com/PaulBGD/react-native-image-slider/blob/master/example/App.js
//  */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import NumericInput from 'react-native-numeric-input';
import { RaisedTextButton } from 'react-native-material-buttons';
import Placeholder from 'rn-placeholder';
import { Constants, SQLite } from 'expo';

import { fetch_variant_product_quantity } from '../utils/api';

const screen = Dimensions.get('window');
const db = SQLite.openDatabase('db.db');

class Product_details extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            data: [],
            data2:[],            
            data_variant_list:[],
            error: 'Sorry data not found',

            default_child_image: false,

            index:0,

            data_product_variant_ids_qty:[],

            value:0,
            maxValue:0,
            numeric_value: 0,

            isReady_product_title_price: false,
            image_loading: true,

           

        }
    }

    componentDidMount() {
        this.makeRemoteRequest();  
        
        db.transaction(function(txn) {
            // txn.executeSql('DROP TABLE IF EXISTS table_cart', []);
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='table_cart'",
              [],
              function(tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS table_cart', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS table_cart(id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INT(10), product_name VARCHAR(20), product_price INT(20), product_size VARCHAR(20), product_image VARCHAR(255), product_quantity INT(10))',
                    []
                  );
                }
              }
            );
        });

    }

    addTocart = () => {
        var that = this;
        const { id, display_name, website_public_price } = this.state.data;
        db.transaction(function(tx) {
            tx.executeSql(
                'INSERT INTO table_cart (product_id, product_name, product_price, product_size, product_image, product_quantity) VALUES (?,?,?,?,?,?)',
                [id, display_name, website_public_price, null,null,null],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'Added to cart successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () =>
                                    that.props.navigation.navigate('Cart'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Registration Failed');
                    }
                }
            );
        });

    }

    handleProductQuantityRequest = async id => {
        this.setState({loading: true}, async () => {
            try{
              const qnty = await fetch_variant_product_quantity(id);
            //   const { location, weather, temperature } = await fetchWeather(locationId);
      
              this.setState({
                loading: false,
                error: false,
                // index,
                maxValue: qnty.qty_available,
                numeric_value:0,
                // maxValue: this.state.value,
              }, async () => {
                //   this.handleProductQuantityRequest(id);
              })
            } catch(e){
              this.setState({
                loading: false,
                error: true,
              });
            }
        });

    };

    updateIndex = (index) => {
        this.setState({index});
        let product_variant_id = this.state.data.product_variant_ids[index];
        let quantity = this.handleProductQuantityRequest(product_variant_id);     

        
    }

    makeRemoteRequest = async () => {    

        // const { offset, limit } = this.state;  
        // const user_id = this.props.navigation.getParam('id', 'no data');

        const product_id = 1439;        
        // const product_id = this.props.navigation.getParam('id', 'no data');

        // api no: 11.  Get Single Product
        const url11 = `http://128.199.225.144:8069/restapi/1.0/object/product.template/${product_id}?fields=['id','display_name','image','website_public_price','product_variant_ids','product_image_ids']`;

         
        // this.setState({ loading: true });
    
        try{
            const res = await fetch(url11);
            const resJson = await res.json();
            this.setState({                            
                data: resJson["product.template"][0], 
                isReady_product_title_price: true,  
                image_loading:false,   
            }, async () => {
                this.makeRemoteRequest();  
                
                if(this.state.data.product_image_ids && this.state.data.product_image_ids.length > 0){
                    this.makeSecondRequest(this.state.data.product_image_ids);
                }                
                       
                this.makeProductSizeRequest(this.state.data.product_variant_ids);
            }); 
        } catch (error ){
            console.warn(error);
        }
        
 
    };

    makeSecondRequest = async (product_image_ids) => {
        // using api no: 12. Get Single Product Images
        // const product_image_ids = 439;
        const url12 = `http://128.199.225.144:8069/restapi/1.0/object/product.image?ids=${product_image_ids}&fields=['image']`;

         
        this.setState({ image_loading: false });

        try{
            const res = await fetch(url12);
            const resJson = await res.json();
            this.setState({                            
                data2: resJson["product.image"],   
                image_loading: false,  
            }, async () => {
                // this.makeRemoteRequest();
                // this.makeSecondRequest(product_image_ids);
                this.makeSecondRequest(this.state.data.product_image_ids);
                // this.makeProductSizeRequest(this.state.data.product_variant_ids);
            }); 
        } catch (error ){
            console.warn(error);
        }

        // ---------------------------------------------------

        // // setTimeout(()=>{
        //     return fetch(url12)    
        //     .then(res => res.json())        
        //     .then(res => {
        //         this.setState({                            
        //             data2: res["product.image"],   
        //             loading: false,            
        //         }, () => {
        //             this.makeSecondRequest(product_image_ids);               
        //         });

        //     })    
        //     .catch(error => {
        //         this.setState({ error, loading: false });
        //     }).done();
        // // }, 2000);
        
    }

    makeProductSizeRequest = (product_variant_ids) => {


        // using api no: 13. Get Variant List
        const url13 = `http://128.199.225.144:8069/restapi/1.0/object/product.product?ids=${product_variant_ids}&fields=['id','display_name']`;

         
        // this.setState({ loading: true });
        
        
        // setTimeout(()=>{
            return fetch(url13)    
            .then(res => res.json())        
            .then(res => {
                this.setState({                            
                    data_variant_list: res["product.product"],  
                    loading: false,            
                }, () => {
                    // this.makeProductSizeRequest(product_variant_ids);
                    this.makeProductSizeRequest(this.state.data.product_variant_ids);                    
                });

            })    
            .catch(error => {
                this.setState({ error, loading: false });
            }).done();
        // }, 2000);
    }

    // makeProductAvailableQuantityRequest = (product_variant_ids) => {
    //     // return console.log(product_variant_ids);
        
    //     product_variant_ids.map((id)=>{
    //         // calling api no 14 get qty by variant id
    //         fetch(`http://128.199.225.144:8069/restapi/1.0/object/product.product/${id}?fields=['id','qty_available']`)    
    //         .then(res => res.json())        
    //         .then(res => {
    //             this.setState({                            
    //                 data_product_variant_ids_qty: this.state.data_product_variant_ids_qty.push(res["product.product"][0].qty_available),  

    //             }, () => {
    //                 // this.makeProductSizeRequest(product_variant_ids);                    
    //             });

    //         })    
    //         .catch(error => {
    //             this.setState({ error, loading: false });
    //         }).done();
    //     })

    //     console.log(this.state.data_product_variant_ids_qty);


    // }    

    
    
    render() {
        // const images = [
        // `https://placeimg.com/480/480/nature`,
        // `https://placeimg.com/480/480/nature`,
        // ];

        // var parImage = `data:image/png;base64,${this.state.data.image}`;

        let parent_img_array = [];

        if(this.state.data.image === false){
            parent_img_array.push(`require('../images/default-bg.png')`);
        }else{
            parent_img_array.push(`data:image/png;base64,${this.state.data.image}`);
        }
        
        let child_img_array = [];

        let child_img_data = this.state.data2;
        child_img_data.map((data)=>{
            child_img_array.push(`data:image/png;base64,${data.image}`);
        })
        // var chiImage = `data:image/png;base64,${this.state.data2.image}`;
        // let merge_image = parent_img_array.concat(child_img_array);
        let merge_image = child_img_array.concat(parent_img_array);
     
        //-----------------------------------------------------------------------
        // let defalut_images = [];
        let images = [];
        if(this.state.data.product_image_ids && this.state.data.product_image_ids.length > 0){
          images = merge_image;
        }else{
            
            images.push(`require('../images/default-bg.png')`);

        }
        


        //-----------------get product variant size data ------------------------
        let variant_size_list = [];

        this.state.data_variant_list.map((data)=>{
            let display_name = data.display_name;

            //-----------------------------------------------------
            // let display_size = display_name.slice(display_name.length - 3, display_name.length -1);
            // var res = str.split("(");
            // res = res[1].replace(")", "");
            //-----------------------------------------------------

            //-----------------------------------------------------
            // let display_size = display_name.split("(");          
            // display_size = display_size[1].replace(")", "");
            //-----------------------------------------------------

            let display_size = display_name.split(" ");
            display_size = display_size.slice(-1)[0]; 
            display_size = display_size.replace("(", "");
            display_size = display_size.replace(")", "");

            // console.warn(display_size);
            if(display_size !== null){
                variant_size_list.push(display_size);
                // variant_size_list =[...display_size];
            }else{
                variant_size_list.push('na');
            }
        });

        // -------------------------------get product variant size qnty-----------------
      

        // function handleQantityValue(value){
        //     let val = data.product_variant_ids[value];
        //     return console.warn(val);
        // }


        // ------------------------------------------------------------------------------
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
            
                <View style={styles.container}>
                    {/* <View style={styles.content1}>
                        <Text style={styles.contentText}>Content 1</Text>
                    </View> */}  

                    { this.state.image_loading && (
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>   
                        <ActivityIndicator size="small" color="#000000" /></View>
                    )}
                    
                    { !this.state.image_loading && (
                    <ImageSlider
                        loop
                        autoPlayWithInterval={4000}
                        images={images}
                        onPress={({ index }) => alert(index)}
                        customSlide={({ index, item, style, width }) => (
                            // It's important to put style here because it's got offset inside
                            <View
                            key={index}
                            style={[
                                style,
                                styles.customSlide,
                                { backgroundColor: index % 2 === 0 ? '#ffffff' : '#fff' },
                            ]}
                            >
                                <Image source={{ uri: item }} resizeMode="contain" style={styles.customImage} />
                            </View>
                        )}
                        customButtons={(position, move) => (
                            <View style={styles.buttons}>
                                {images.map((image, index) => {
                                    return (
                                    <TouchableHighlight
                                        key={index}
                                        underlayColor="#ccc"
                                        onPress={() => move(index)}
                                        style={styles.button}
                                    >
                                        <Text style={position === index && styles.buttonSelected}>
                                        {index + 1}
                                        </Text>  
                                    </TouchableHighlight>
                                    );
                                })}   
                            </View>
                        )} 
                    />
                    
                    )}

                    {/* <View style={styles.content2}>
                    <Text style={styles.contentText}>Content 2</Text>
                    </View> */}
                </View>
                
                {/* prodcut display name and price */}
                <View style={{flex:.2, backgroundColor:'white', justifyContent:'center', paddingLeft:10}}>
                    <Placeholder.Paragraph
                        animate="fade"
                        lineNumber={2}
                        textSize={16}
                        lineSpacing={5}
                        width="100%"
                        lastLineWidth="20%"
                        firstLineWidth="40%"
                        onReady={this.state.isReady_product_title_price}
                    >
                        <Text style={{fontWeight:'500', fontSize:16}}>{this.state.data.display_name}</Text>
                        <Text style={{color:'#707070'}}>&#x9f3; {this.state.data.website_public_price}</Text>
                    </Placeholder.Paragraph>
                    
                </View>

                {/* product variant verticle size list */}
                <View style={{flex:.2, backgroundColor:'white', justifyContent:'center' }}>
                    <ButtonGroup
                        selectedBackgroundColor="black"
                        selectedButtonStyle={{borderColor: '#000000', borderWidth: 1,}}
                        onPress={this.updateIndex}
                        selectedIndex={this.state.index}
                        // buttons={['XS','S', 'M', 'L', 'XL', 'XXL']}
                        buttons={variant_size_list}
                        containerStyle={{height: 50}} 
                    />
                </View>
                <View style={{flex:.3, backgroundColor:'white', justifyContent:'center', alignItems:'flex-start', marginLeft:10 }}>
                    <Text style={{fontWeight:'400', fontSize:16}}>Available Quantity: {this.state.maxValue} </Text>

                    <NumericInput
                        initValue={this.state.numeric_value}
                        value={this.state.numeric_value}
                        onChange={(numeric_value) => this.setState({numeric_value})}
                        totalWidth={150}
                        totalHeight={35}
                        rounded
                        minValue={1}
                        maxValue={this.state.maxValue}
                        step={1}
                        iconStyle={{ fontSize: 15, color: '#434A5E' }}
                        inputStyle={{ fontSize: 18, color: '#434A5E' }}
                        valueType='real'
                        borderColor='#C7CBD6'
                        rightButtonBackgroundColor='#C7CBD6'
                        leftButtonBackgroundColor='#C7CBD6'
                    />

                </View>

                <View 
                    style={{
                        flex: .3, 
                        justifyContent:'flex-end', 
                        // backgroundColor:'yellow'
                    }}
                >
                    <RaisedTextButton
                        // onPress={() => this.props.navigation.navigate("Welcome")}
                        onPress={this.addTocart}
                        // onPress={()=>alert('clicked')}
                        
                        title="ADD TO CART"
                        style={{
                            backgroundColor:'#000000',
                            marginHorizontal: 5,   
                            paddingTop:25,
                            paddingBottom:25,
                            borderRadius: 5,  
                            marginBottom:10,      
                        }}
                        titleColor='#ffffff'
                    />
                </View>
                

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#eeeeee',
    height:screen.height/2 - 100,
    // paddingVertical: 5,
    borderRadius: 5,
  },
  slider: { backgroundColor: '#000', height: 350 },
  content1: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content2: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: { color: '#fff' },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    opacity: 1,
    color: 'orange',
  },
  customSlide: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: screen.width - 20,
    height: screen.height/3 + 20,
  },
});

export default Product_details;






// ---------------------- testing api --------------------------

// import React from 'react';
// import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

// export default class FetchExample extends React.Component {

//   constructor(props){
//     super(props);
//     this.state ={ isLoading: true}
//   }

//   componentDidMount(){
//     return fetch('https://facebook.github.io/react-native/movies.json')
//       .then((response) => response.json())
//       .then((responseJson) => {

//         this.setState({
//           isLoading: false,
//           dataSource: responseJson.movies,
//         }, function(){

//         });

//       })
//       .catch((error) =>{
//         console.error(error);
//       });
//   }



//   render(){

//     if(this.state.isLoading){
//       return(
//         <View style={{flex: 1, padding: 20}}>
//           <ActivityIndicator/>
//         </View>
//       )
//     }

//     return(
//       <View style={{flex: 1, paddingTop:20}}>
//         <FlatList
//           data={this.state.dataSource}
//           renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
//           keyExtractor={({id}, index) => id}
//         />
//       </View>
//     );
//   }
// }