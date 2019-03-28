import React, {Component} from "react";
import { 
    Text, 
    View, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView,
    ActivityIndicator,
    AsyncStorage

} from "react-native";
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





export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
          drop_down_data:[],
          loading: false,
          partner_id: ''
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
            this.setState({ drop_down_data }, () => {
                // this.handlePickerData();
            }); // Set the new state
        })
        .catch((error) => {
            console.error(error);
        }).done();
        }, 1000);
    }
    
    componentDidMount(){
        return [this.handlePickerData(), this.getUserData()];
    }

    getUserData = () => {    
        AsyncStorage.getItem('user_data').then((data) => {
            let parse = JSON.parse(data);
            // let email = parse["res.users"][0].login
            this.setState({
                // user_child_ids: parse["res.users"][0].child_ids,           
                // user_child_ids: parse["res.users"][0].child_ids,
                partner_id: parse["res.users"][0].partner_id,           
            })
        })
    }

    addShipping = ({
        name,
        address1,
        address2,
        city,
        state,
        zipCode,
        pNumber
      }) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            //   const partner_id = 23955;
            const partner_id = this.state.partner_id;
              // posting sign up data
              return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.partner?vals={'parent_id':${partner_id},'type':'delivery','name':'${name}','phone':'${pNumber}','street':'${address1}','street2':'${address2}','city':'${city}','state_id':'${state}','zip':'${zipCode}','country_id':20}`,{method: 'POST'})
              .then((response) => response.json())
              .then((responseJson) => {
      
                  this.setState({ loading: true })
                  
                  if (typeof(responseJson["res.partner"]) === "undefined") {
                      reject(new Error(responseJson.error.message));
                  } else {            
                      resolve(true);
                  }
      
              })
              .catch((error) => {
                  this.setState({ loading: true, })
                  // reject(new Error(error));
                  resolve(true);
              }).done();
      
      
          }, 1000);
        });
      
      }

    render(){
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
                            onSubmit={(values, actions) => {
                                this.addShipping({name: values.name, address1: values.address1 , address2: values.address2 , city: values.city , state: values.state , zipCode: values.zipCode , pNumber: values.pNumber })
                                .then((data) => {
                                    // alert(JSON.stringify(data, null, 2));
                                    setTimeout(()=>{
                                        this.setState({ loading: false })

                                        alert("successfully add shipping address");
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
                                    label="State state"
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
                                { this.state.loading && (
                                <ActivityIndicator animating={this.state.loading} color='black' size='large' /> )}
                                
                                { !this.state.loading && ( 
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
                                />  )}

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