import * as React from 'react';
import { Container, H3, Content, List, ListItem, Text, Left, Right } from 'native-base';
import { Divider } from 'react-native-paper';

export default class PHDetails extends React.Component {
  render({earn_online_purchase, earn_store_purchase, earn_app_purchase, earn_pos, redeem_online_purchase, redeem_store_purchase, redeem_app_purchase, redeem_pos, total_earn_points, total_redeem_points, total_loyalty_points } = this.props) {
    return (
        <Container>
            <Content style={{marginTop:10}}>
            <List>
                <ListItem itemDivider style={{backgroundColor:'transparent'}}>
                <H3>Point Earn Details</H3>
                </ListItem>                    
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>Online Purchase</Text></Left>
                    <Right><Text>{earn_online_purchase}</Text></Right>
                </ListItem>
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>Store Purchase</Text></Left>
                    <Right><Text>{earn_store_purchase}</Text></Right>
                </ListItem>
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>App Purchase</Text></Left>
                    <Right><Text>{earn_app_purchase}</Text></Right>
                </ListItem>
                <ListItem style={{marginBottom:15, borderBottomWidth:0, height:5}}>
                    <Left><Text>POS</Text></Left>
                    <Right><Text>{earn_pos}</Text></Right>
                </ListItem>

                <Divider style={{marginHorizontal:15}}/>

                <ListItem itemDivider style={{backgroundColor:'transparent', marginTop:15}}>
                <H3>Point Redeem Details</H3>
                </ListItem>                    
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>Online Purchase</Text></Left>
                    <Right><Text>{redeem_online_purchase}</Text></Right>
                </ListItem>
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>Store Purchase</Text></Left>
                    <Right><Text>{redeem_store_purchase}</Text></Right>
                </ListItem>
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>App Purchase</Text></Left>
                    <Right><Text>{redeem_app_purchase}</Text></Right>
                </ListItem>
                <ListItem style={{marginBottom:15, borderBottomWidth:0, height:5}}>
                    <Left><Text>POS</Text></Left>
                    <Right><Text>{redeem_pos}</Text></Right>
                </ListItem>

                <Divider style={{marginHorizontal:10}}/>

                <ListItem itemDivider style={{backgroundColor:'transparent', marginTop:15}}>
                <H3>Summary</H3>
                </ListItem>                    
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>Total Earn Points</Text></Left>
                    <Right><Text>{total_earn_points}</Text></Right>
                </ListItem>
                <ListItem style={{borderBottomWidth:0, height:5}}>
                    <Left><Text>Total Redeem Points</Text></Left>
                    <Right><Text>{total_redeem_points}</Text></Right>
                </ListItem>
                <ListItem style={{marginBottom:10, borderBottomWidth:0, height:5}}>
                    <Left><Text>Total Loyalty Points</Text></Left>
                    <Right><Text>{total_loyalty_points}</Text></Right>
                </ListItem>

            </List>
            </Content>
      </Container>
    );
  }
}

