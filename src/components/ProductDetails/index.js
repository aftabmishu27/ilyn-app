import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { Card, Title, Paragraph } from 'react-native-paper';

// import logo from '../../images/app_icon.png';

// 'https://picsum.photos/700'
// 'http://128.199.225.144:8069/restapi/1.0'

const screen = Dimensions.get('window');

class ProductDetails extends React.Component {  
    render({ title, price, image, onPress } = this.props){

        var base64Icon = `data:image/png;base64,${image}`;

        // if(image === true){
        //     productImage = `{ uri: 'data:image/png;base64,${image}' }`;
        // }else{
        //     productImage = `require('../../images/app_icon.png')`;
        // }

        if(image === false){
            return(
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress = {onPress}
                    style={{
                        flex:1,
                        padding:5
                    }}
                >
                {/* style={{height:200}} style={{flex:1, height: 250, width: undefined}} */}
                <View style={styles.container}>
                        <Card>
                            <Card.Cover style={{backgroundColor:'#fff' }}   source={require('../../images/default-bg.png')}  />
                            <Card.Content>
                            <Title>{title}</Title>
                            <Paragraph>&#x9f3; {price}</Paragraph>
                            </Card.Content>    
                        </Card>                     
                </View>
                </TouchableOpacity> 
            );
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress = {onPress}
                    style={{
                        flex:1,
                        padding:5
                    }}
                >
                <View style={styles.container}>
                        <Card>
                            <Card.Cover source={{uri: base64Icon}} />
                            <Card.Content>
                            <Title>{title}</Title>
                            <Paragraph>&#x9f3; {price}</Paragraph>
                            </Card.Content>    
                        </Card>                    
                </View> 
                </TouchableOpacity>              
            );
        }

        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // padding:5
    }
});

export default ProductDetails;