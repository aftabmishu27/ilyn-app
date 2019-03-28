import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Card, Title, Paragraph } from 'react-native-paper';


class OHDetails extends React.Component {  
    render({ display_name,price_unit,quantity,sub_total,discount } = this.props){
        return(
            <View style={styles.container}>
                <Card>
                    <Card.Content>
                        <Title>{display_name}</Title>
                        <Paragraph>Unit Price: &#x9f3; {price_unit}</Paragraph>
                        <Paragraph>Quantity: {quantity}</Paragraph>
                        <Paragraph>Sub Total: &#x9f3; {sub_total}</Paragraph>
                        <Paragraph>Discount: {discount}</Paragraph>
                    </Card.Content>    
                </Card>                    
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5

    }
});

export default OHDetails;