import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";

const screen = Dimensions.get('window');

class OrderHistory extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render({ order_id, order_date, amount_total, status, order_line } = this.props){
        // let orders = toString(order_line);
        
        // if(order_line.length === 0){
        //     console.warn('no order list');
        // }else{
        //     let ordrs = order_line.toString();
        //     console.log(ordrs);
        // }
      
        return(
            <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    height:screen.height/8,
                    // backgroundColor:'#388e3c',
                    paddingVertical:15,
                }}
            >
                <Grid>
                    {/* col one */}
                    <Col 
                        style={{
                            // backgroundColor:'#388e3c'
                        }}                        
                    >
                        <Row 
                            style={{
                                // backgroundColor:'#e91e63'
                            }}                            
                        >
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <Text style={{fontWeight:'500'}}>Order ID</Text>
                            </View>
                        </Row>
                        <Row 
                            style={{
                                // backgroundColor:'#fff350'
                            }}
                        >
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <Text>{order_id}</Text>
                            </View>
                        </Row>
                    </Col>

                    {/* col two */}
                    <Col 
                        style={{
                            // backgroundColor:'#ff6f00'
                        }}                        
                    >
                        <Row 
                            style={{
                                // backgroundColor:'#ffffff'
                            }}
                        >
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <Text style={{fontWeight:'500'}}>Date</Text>
                            </View>
                        </Row>
                        <Row 
                            style={{
                                // backgroundColor:'#5e35b1'
                            }}
                        >
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <Text style={{textAlign:'center'}}>{order_date}</Text>
                            </View>
                        </Row>
                    </Col>

                    {/* col three */}
                    <Col 
                        style={{
                            // backgroundColor:'#388e3c'
                        }}
                    >
                        <Row 
                            style={{
                                // backgroundColor:'#e91e63'
                            }}                            
                        >
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <Text style={{fontWeight:'500'}}>Amount</Text>
                            </View>
                        </Row>
                        <Row 
                            style={{
                                // backgroundColor:'#fff350'
                            }}                            
                        >
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <Text>{amount_total}</Text>
                            </View>
                        </Row>
                    </Col>

                    {/* col four */}
                    <Col 
                        style={{
                            // backgroundColor:'#ff6f00'
                        }}
                    >
                        <Row 
                            style={{
                                // backgroundColor:'#ffffff'
                            }}                            
                        >
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                <Text style={{fontWeight:'500'}}>Status</Text>
                            </View>
                        </Row>
                        <Row>
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                            >
                                {this.renderStatus()}
                            </View>                                
                        </Row>
                    </Col>
                    {/* col five for details */}
                    <Col 
                        style={{
                            // backgroundColor:'#388e3c'
                        }}
                    >
                        <View
                            style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                        >
                            {this.renderDetails()}
                        </View>
                    </Col>
                </Grid>
            </View>
        );
        
    }

    renderStatus(){
        if(this.props.status === 'no'){
            return(
                <Text style={{color:'#ffc107'}}>Processing</Text>
            )
        }else{
            return(
                <Text style={{color:'#009688'}}>Confirmed</Text>
            )
        }
    }

    renderDetails(){
        if(this.props.order_line.length === 0){
            return(
                <Text 
                style={{
                    fontWeight:'500'
                }}
                onPress={()=>alert('No order details found')}
                >Details</Text>
            )
            
        }else{
            return(
                <Text 
                style={{
                    fontWeight:'500'
                }}
                onPress={this.props.onPress}
                >Details</Text>
            )
        }
    }
}


export default OrderHistory;