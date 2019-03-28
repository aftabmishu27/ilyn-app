import React, {Component} from "react";
import { 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  Keyboard, 
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { RaisedTextButton } from 'react-native-material-buttons';
import { Row, Grid } from "react-native-easy-grid";
import Spinner from 'react-native-loading-spinner-overlay';
import * as Yup from "yup";

import { OAuth } from 'oauth-1.0a'

const screen = Dimensions.get('window');

// const FormikInput = handleTextInput(TextField);
const FormikInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const InputsContainer = withNextInputAutoFocusForm(View)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(4, "That can't be very secure"),

});

// const mishu = (ripon) => {
//   alert(JSON.stringify(ripon, null, 2));
// }

// const Log_in = ({ email, password }) =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//         this.setState({email:email, password:password})
//         if (email === 'mishuraj237@gmail.com') {
//             reject(new Error("Email or password doesn't match!"));
//         }
//         resolve(true);
//     }, 1000);
// });



export default class Login extends Component{
  //Define your state for your component. 
  // state = {
  //   //Assing a array to your pokeList state
  //   logData: [],
  //   //Have a loading state where when data retrieve returns data. 
  //   loading: true,
  //   // email:'mishuraj27@gmail.com',
  //   // password:'mishu',
  // }

  constructor(props){
    super(props);
    this.state = {
      logData: [],
      loading: false,
    }
  }

  //Define your componentDidMount lifecycle hook that will retrieve data.

  //Also have the async keyword to indicate that it is asynchronous. 

  // async componentDidMount() {
  //   //Have a try and catch block for catching errors.
  //   try {
  //     //Assign the promise unresolved first then get the data using the json method. 
  //     // const name = 'mishuraj27@gmail.com';
  //     // const password = 'mishu' 
  //     const logInApiCall = await fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.users?domain=[('login','=','${this.state.email}'),('passkey','=','${this.state.password}'),('customer','=',True)]&fields=['id','name','login','partner_id','child_ids']`);

  //     const logData = await logInApiCall.json();

  //     this.setState({logData: logData, loading: false});

  //   } catch(err) {
  //     alert("Error fetching data !", err);
  //   }

  // }

  
  render(){

    const Log_in = ({ email, password }) => {
      return new Promise((resolve, reject) => {          
        setTimeout(() => {
          // fetching login data

          this.setState({ loading: true })


          return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.users?domain=[('login','=','${email}'),('passkey','=','${password}'),('customer','=',True)]&fields=['id','name','login','partner_id','child_ids']&`)
          .then((response) => response.json())
          .then((responseJson) => {
            // ["res.users"][0].name
            // resolve(typeof(responseJson.code));

            if(typeof(responseJson.code) === "undefined"){
              // this.setState({ loading: false })
              resolve(responseJson);
            }else{
              // this.setState({ loading: false })
              reject(new Error("email and password doesn't match!"));
            }            
            
          })
          .catch((error) => {
            reject(new Error(error));
          }).done();

        }, 1000);
      });

    }

    // const displayData = async () => {
    //   try{
    //     let display_user = await AsyncStorage.getItem('user_data');
    //     // AsyncStorage.clear();
    //     let parse = JSON.parse(display_user)

    //     console.warn(parse["res.users"][0].login)
    //   }
      
    //   catch(error){
    //     alert(error);
    //   }
    // }

    // { this.state.loading && (
    //   <View style={{backgroundColor:'yellow', paddingVertical:10}}>
    //     <ActivityIndicator animating color='black' size='large' /> 
    //     <Text style={{textAlign:'center'}}>Waiting for login...</Text>
    //   </View>
    // )}

    
    

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
      style={{
          flex:1,
          justifyContent:'center'
      }}
      > 
      <StatusBar
        barStyle = "dark-content"
        // dark-content, light-content and default
        hidden = {false}
        //To hide statusBar
        backgroundColor = "#000000"
        //Background color of statusBar
        translucent = {false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible = {true}
      />
     
      <KeyboardAvoidingView style={{ flex:1 }} keyboardVerticalOffset = {-220}  behavior="padding" enabled>
      <Grid>
        {/* First row */}
        <Row 
          size={2} 
          style={{
            // backgroundColor:'#b4004e'
          }}
        >
            <View
              style={{
                flex:1,
                alignItems:'center',
                justifyContent:'flex-end',
              }}
            >
              <Text style={{fontSize:24, textAlign:'center'}}>LOGIN</Text>
            </View>
        </Row>
        {/* Second row */}
        <Row 
          size={1.5} 
          style={{
            // backgroundColor:'#320b86'
          }}
        >
          <View
              style={{
                flex:1,
                alignItems:'center',
                justifyContent:'flex-end',
                paddingLeft:60,
                paddingRight:60,
                // backgroundColor:'yellow'
              }}
            >
              <Text style={{fontSize:18, textAlign:'center'}}>Please enter your email and password to login</Text>
          </View>
        </Row>
        {/* third row */}
        <Row 
          size={5} 
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
              // onSubmit={values => mishu(values)}
              // initialValues={{ email: 'mishuraj27@gmail.com' }}
              onSubmit={(values, actions) => {
                Log_in({ email: values.email, password: values.password })
                .then((data) => {
                    
                    // alert(JSON.stringify(values, null, 2));
                    // alert('succesfully loged in');
                    // let value = this.state.logData;
                    // this.setState({email: values.email, password:values.password})
                    // let value = this.state.logData;
                    // alert(JSON.stringify(value["res.users"][0].name));

                    // alert(JSON.stringify(data, null, 2));
                    // {() => this.props.navigation.navigate("Welcome")}

                    this.setState({ loading: false })
                    AsyncStorage.setItem('user_data', JSON.stringify(data));

                    // displayData();

                    return this.props.navigation.navigate("Tabs", { name: data });
                })
                .catch(error => {
                  this.setState({ loading: false })
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
                  <InputsContainer style={{ paddingLeft: 30, paddingRight:30}}
                  
                  >
                    {/* email validation with formik */}
                    {/* <TextField 
                      label="email" 
                      onChangeText={text => props.setFieldValue("mishu", text)}
                      onBlur={()=>props.setFieldTouched("mishu")}
                      // error={props.errors.mishu}
                      error = {
                        props.touched.mishu || props.submitCount > 0 ? props.errors.mishu : null
                      }
                    /> */}

                    {/* email validation with react-native-formik */}
                    <FormikInput
                      label="Email/Phone"
                      name="email"
                      type="email"
                      baseColor = "#000000"
                      lineWidth = {1}
                      labelFontSize = {18}
                      
                    />


                    {/* password validation with formik */}
                    {/* <TextField 
                      label="password" 
                      onChangeText={ aftab => props.setFieldValue("password", aftab)}
                      onBlur = {()=>props.setFieldTouched("password")}
                      // error={props.errors.password}
                      error = {
                        props.touched.password || props.submitCount > 0 ? props.errors.password : null
                      }
                    /> */}

                    {/* password validation with react-native-formik */}
                    <FormikInput
                      label="Password"
                      name="password"
                      type="password"
                      baseColor = "#000000"
                      lineWidth = {1}
                      labelFontSize = {18}
                    />

                    {/* { this.state.loading && (

                          <View style={{backgroundColor:'yellow', paddingVertical:10}}>
                            <ActivityIndicator animating color='black' size='large' /> 
                            <Text style={{textAlign:'center'}}>Waiting for login...</Text>
                          </View>

                        )
                    }          */}

                    { this.state.loading && (    
                        <Spinner
                          visible={this.state.loading}
                          textContent={'Waiting for Login...'}
                          textStyle={{color:'#fff'}}
                          overlayColor = "rgba(14, 21, 4, 0.85)"
                        />
                    )}

                    { !this.state.loading && (
                    <RaisedTextButton
                      // onPress={() => this.props.navigation.navigate("Welcome")}
                      onPress={props.handleSubmit}
                      
                      title="LogIn"
                      style={{
                        backgroundColor:'#000000',
                        marginTop:25,   
                        paddingTop:25,
                        paddingBottom:25,
                        borderRadius: 5,         
                      }}
                      titleColor='#ffffff'
                    />
                    )}

                    {/* <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text> */}
                    <Text style={{ color: 'red', textAlign:'center',marginTop:10, marginBottom:15 }}>  
                        {props.errors.general}
                    </Text>
                    
                  </InputsContainer>
                );
              }}
            </Formik>
          </View>
        </Row>
        {/* Fourth row */}
        <Row 
          size={1} 
          style={{
            // backgroundColor:'#0069c0'
          }}
        >
            <View
              style={{
                flex:1,
                alignItems:'center'
              }}
            >
              <Text>Forget your password?</Text>
            </View>
        </Row>
        {/* Fifth row */}
        <Row 
          size={2} 
          style={{
            // backgroundColor:'#005b4f'
          }}
        >
          <View
              style={{
                flex:1,
                alignItems:'center'
              }}
            >
              <Text
                onPress={() => this.props.navigation.navigate("SignUp")}
              >Don't have an account? Click here</Text>
          </View>
        </Row>
      </Grid>
      </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}