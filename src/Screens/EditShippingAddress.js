import React, {Component} from "react";
import { Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { RaisedTextButton } from 'react-native-material-buttons';
import { Dropdown } from 'react-native-material-dropdown';
import { Row, Grid } from "react-native-easy-grid";
import * as Yup from "yup";
// import Switch from "./Switch";

// const FormikInput = handleTextInput(TextField);
const FormikInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const FormikPicker = compose(
    handleTextInput,
    withNextInputAutoFocusInput
  )(Dropdown);

const InputsContainer = withNextInputAutoFocusForm(View)

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required()
        .min(4, "Try minimum 4 letter"),
    address1: Yup.string()
        .required(),
    city: Yup.string()
        .required(),
    state: Yup.string()
        .required(),
    zipCode: Yup.string()
        .required(),
    pNumber: Yup.string()
        .required(),
        
    
  // star: Yup.boolean()
  //   .required()
  //   .oneOf([true], "Feel free to submit an issue if you found some bugs!")

});

const mishu = (ripon) => {
  alert(JSON.stringify(ripon, null, 2));
}

// const signUp = ({ email }) =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//         if (email === 'mishuraj27@gmail.com') {
//             reject(new Error("You playin' with that fake email address."));
//         }
//         resolve(true);
//     }, 1000);
// });




const EditShipping = ({
  name,
  address1,
  address2,
  city,
  state,
  zipCode,
  pNumber,
  id
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        // const partner_id = 23955;
        // let shipping_address_id = this.props.navigation.getParam('id', 'no data');

        // using api no 23. edit shipping address
        return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.partner/${id}?vals={'name':'${name}','phone':'${pNumber}','street':'${address1}','street2':'${address2}','city':'${city}','state_id':'${state}','zip':'${zipCode}','country_id':20}`,{method: 'PUT'})
        .then((response) => response.json())
        .then((responseJson) => {

          if (typeof(responseJson["res.partner"]) === "undefined") {
            reject(new Error(responseJson.error.message));
          } else {            
            resolve(true);
          }

        })
        .catch((error) => {
          // reject(new Error(error));
          resolve(true);
        });


    }, 1000);
  });

}



export default class EditShippingAddress extends Component{
    constructor(props){
        super(props);
        this.state={
          drop_down_data:[],

          loading: false,
          data: [],

          shipping_address_state_id: this.props.navigation.getParam('id', 'no data'),

        }
    }
    
    handlePickerData(){
        setTimeout(() => {
        // api no 19. Get State List
        fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.country.state?domain=[('country_id','=',20)]&fields=['id','display_name']`).then((response) => response.json())
        .then((responseJson) => {

            let drop_down_data = [];

            responseJson["res.country.state"].map((data) => {
                drop_down_data.push({ value: data.id, label: data.display_name });
            });
            // console.warn(drop_down_data);
            this.setState({ drop_down_data }); // Set the new state
        })
        .catch((error) => {
            console.error(error);
        });
        }, 1000);
    }

    makeRemoteRequest = () => {    

        // const order_line = '6712,6713';

        // let shipping_address_id = this.props.navigation.getParam('id', 'no data');
        // const order_line = ids.toString();


        // api no 19. Get State List
        const url19 = `http://128.199.225.144:8069/restapi/1.0/object/res.country.state?domain=[('country_id','=',20)]&fields=['id','display_name']`;
    
        this.setState({ loading: true });
        
        setTimeout(()=>{
            fetch(url19)    
            .then(res => res.json())
            .then(res => {

                let drop_down_data = [];

                res["res.country.state"].map((data) => {
                    drop_down_data.push({ value: data.id, label: data.display_name });
                });
                // console.warn(drop_down_data);
                this.setState({ drop_down_data }); // Set the new state

                // using api no 22: get shipping address list
                const url22 = `http://128.199.225.144:8069/restapi/1.0/object/res.partner?ids=${this.state.shipping_address_state_id}&fields=['id','name','phone','street','street2','city','state_id','zip']`;


                fetch(url22)    
                .then(response => response.json())
                .then(responseJson => {

                    this.setState({                            
                        data: responseJson["res.partner"][0],            
                        loading: false,           
                    });                    

                })      
                .catch(error => {
                    this.setState({ error, loading: false});
                }).done();


            })      
            .catch(error => {
                this.setState({ error, loading: false});
            }).done();
        }, 1500);  
    };
    
    componentDidMount(){
        this.handlePickerData();
        this.makeRemoteRequest();
    }

    render(){

        if (this.state.loading){
            return(
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
                </View>
            );
        }

        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
            
            <View
                style={{
                    flex:1,
                    justifyContent:'center'
                }}
            >
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset = {60}  behavior="padding" enabled>    
            <ScrollView> 
            <Grid>
                {/* First row */}
                {/* second row */}
                <Row 
                style={{
                    // backgroundColor:'#002984'
                }}
                >
                    <View
                        style={{
                        flex:1,
                        // alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:'#FFFFFF'
                        }}
                    >
                        <Formik
                        // onSubmit={values => alert(JSON.stringify(values, null, 2))}
                        //   onSubmit={values => mishu(values)}
                            initialValues={{ 
                                name: this.state.data.name,
                                address1: this.state.data.street,
                                address2: this.state.data.street2,
                                city: this.state.data.city,
                                zipCode:this.state.data.zip,
                                pNumber:this.state.data.phone
                            }}
                            onSubmit={(values, actions) => {
                                EditShipping({name: values.name, address1: values.address1 , address2: values.address2 , city: values.city , state: values.state , zipCode: values.zipCode , pNumber: values.pNumber, id: this.state.shipping_address_state_id })
                                .then((data) => {
                                    // alert(JSON.stringify(data, null, 2));
                                    
                                    setTimeout(()=>{
                                        alert("successfully updated shipping address");
                                        return this.props.navigation.navigate('ShippingAddressList');
                                    }, 2000);

                                })
                                .catch(error => {
                                    actions.setFieldError('general', error.message);
                                })
                                .finally(() => {
                                    actions.setSubmitting(false);
                                });
                            }}
                            validationSchema = {validationSchema}
                        >
                        {props => {
                            return (
                            <InputsContainer style={{ paddingLeft: 35, paddingRight:35}}>
                                {/* full name validation with react-native-formik */}
                                <FormikInput
                                    label="Full Name"
                                    name="name"
                                    baseColor = "#000000"
                                    lineWidth = {1}
                                    labelFontSize = {18}
                                />
                                

                                {/* address line 1 validation with react-native-formik */}
                                <FormikInput
                                    label="Address Line 1"
                                    name="address1"
                                    baseColor = "#000000"
                                    lineWidth = {1}
                                    labelFontSize = {18}
                                />


                                {/* address line 2 validation with react-native-formik */}
                                <FormikInput
                                    label="Address Line 2"
                                    name="address2"
                                    baseColor = "#000000"
                                    lineWidth = {1}
                                    labelFontSize = {18}
                                />

                                {/* city validation with react-native-formik */}
                                <FormikInput
                                    label="City"
                                    name="city"
                                    baseColor = "#000000"
                                    lineWidth = {1}
                                    labelFontSize = {18}
                                />
                                
                                {/* State validation with react-native-formik */}
                                <FormikPicker
                                    label="Select state"
                                    name="state"
                                    data={this.state.drop_down_data}
                                    itemColor="#000000"
                                    selectedItemColor="#2196f3"
                                    baseColor = "#000000"
                                    lineWidth = {1}
                                    labelFontSize = {18}
                                />


                                {/* Zip code with react-native-formik */}
                                <FormikInput
                                    label="Zip Code"
                                    name="zipCode"
                                    keyboardType="number-pad"
                                    baseColor = "#000000"
                                    lineWidth = {1}
                                    labelFontSize = {18}
                                />

                                {/* Phone number with react-native-formik */}
                                <FormikInput
                                    label="Phone Number"
                                    name="pNumber"
                                    keyboardType="phone-pad"
                                    baseColor = "#000000"
                                    lineWidth = {1}
                                    labelFontSize = {18}
                                />

                                <RaisedTextButton
                                onPress={props.handleSubmit}
                                title="SAVE"
                                style={{
                                    backgroundColor:'#000000',
                                    marginTop:30,   
                                    paddingTop:25,
                                    paddingBottom:25,
                                    borderRadius: 5,         
                                }}
                                titleColor='#ffffff'
                                />

                                {/* <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text> */}
                                <Text style={{ color: 'red', textAlign:'center',marginTop:10, marginBottom:15 }}>{props.errors.general}</Text>
                            </InputsContainer>
                            
                            );
                        }}
                        </Formik>
                    </View>
                </Row>
            </Grid>
            </ScrollView>   
            </KeyboardAvoidingView>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}