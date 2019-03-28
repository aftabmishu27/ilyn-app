import React, {Component} from "react";
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { RaisedTextButton } from 'react-native-material-buttons';
import { Row, Grid } from "react-native-easy-grid";
import * as Yup from "yup";
// import Switch from "./Switch";

// const FormikInput = handleTextInput(TextField);
const FormikInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const InputsContainer = withNextInputAutoFocusForm(View)

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(4, "Try minimum 4 letter"),
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(4, "That can't be very secure"),
  confirmPassword: Yup
    .string()
    .required()
    .test('passwords-match', 'Passwords doesn\'t match', function(value) {
    return this.parent.password === value;
  }),
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
      loading:false,
    }

  }

  signUp = ({
    name,
    email,
    password
  }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // posting sign up data
  
        this.setState({
          loading: true
        })
        return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.users?vals={'name':'${name}','login':'${email}','password':'${password}'}`,{method: 'POST'})
          .then((response) => response.json())
          .then((responseJson) => {
  
            if (typeof(responseJson["res.users"]) === "undefined") {
              // this.setState({ loading: false })
              reject(new Error(responseJson.error.message));
            } else {            
              // this.setState({ loading: false })
              resolve(true);
            }
  
          })
          .catch((error) => {
            // reject(new Error(error));
            // this.setState({ loading: false })
            resolve(true);
          }).done();
  
        // --------------------------------------------------------------------
        // async () => {
        //   try {
        //     let response = await fetch(
        //       `http://128.199.225.144:8069/restapi/1.0/object/res.users?vals={'name':'${name}','login':'${email}','password':'${password}'}`,{method: 'POST'}
        //     );
        //     let responseJson = await response.json();
        //     // return responseJson.movies;
        //     if (typeof(responseJson["res.users"]) === "undefined") {
        //       reject(new Error(responseJson.error.message));
        //     } else {            
        //       resolve(true);
        //     }
  
        //   } catch (error) {
        //     reject(new Error(error));
        //   }
        // }
  
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
      <KeyboardAvoidingView style={{ flex:1}} keyboardVerticalOffset = {-160}  behavior="padding" enabled>
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
                  justifyContent:'center',
                }}
              >
                <Text style={{fontSize:24, textAlign:'center'}}>SIGN UP</Text>
            </View>
        </Row>
        {/* second row */}
        <Row 
          size={4} 
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
                    this.signUp({name: values.name, email: values.email , password: values.password })
                    .then((data) => {
                        // alert(JSON.stringify(data, null, 2));
                        // alert("successfully signed up");

                        setTimeout(()=>{
                          this.setState({ loading: false })
                          alert("successfully signed up");
                          return this.props.navigation.navigate('Login');
                        }, 500);
                    })
                    .catch(error => {
                      this.setState({ loading: false })
                      actions.setFieldError('general', error.message);
                    })
                    .finally(() => {
                      this.setState({ loading: false })
                      actions.setSubmitting(false);
                    });
                }}
                validationSchema = {validationSchema}
            >
              {props => {
                return (
                  <InputsContainer style={{ paddingLeft: 35, paddingRight:35}}>
                    {/* name validation with react-native-formik */}
                    <FormikInput
                      label="Name"
                      name="name"
                      baseColor = "#000000"
                      lineWidth = {1}
                      labelFontSize = {18}
                    />

                    {/* email validation with react-native-formik */}
                    <FormikInput
                      label="Email"
                      name="email"
                      type="email"
                      baseColor = "#000000"
                      lineWidth = {1}
                      labelFontSize = {18}
                    />


                    {/* password validation with react-native-formik */}
                    <FormikInput
                      label="Password"
                      name="password"
                      type="password"
                      baseColor = "#000000"
                      lineWidth = {1}
                      labelFontSize = {18}
                    />

                    {/* confirm  password validation with react-native-formik */}
                    <FormikInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      baseColor = "#000000"
                      lineWidth = {1}
                      labelFontSize = {18}
                    />
                    
                    {/* <Switch
                      label="If you like the repo, have you starred it 😁?"
                      name="star"
                    /> */}

                    { this.state.loading && (
                      <View style={{backgroundColor:'yellow', paddingVertical:10}}>
                        <ActivityIndicator animating color='black' size='large' /> 
                        <Text style={{textAlign:'center'}}>Waiting for signup...</Text>
                      </View>
                    )}

                    { !this.state.loading && (
                    <RaisedTextButton
                      onPress={props.handleSubmit}
                      title="Create account"
                      style={{
                        backgroundColor:'#000000',
                        marginTop:30,   
                        paddingTop:25,
                        paddingBottom:25,
                        borderRadius: 5,         
                      }}
                      titleColor='#ffffff'
                    />
                    )}

                    {/* <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text> */}
                    <Text style={{ color: 'red', textAlign:'center',marginTop:10, marginBottom:15 }}>{props.errors.general}</Text>
                  </InputsContainer>
                  
                );
              }}
            </Formik>
          </View>
        </Row>
        <Row size={1.5}>
          <View
            style={{
              flex:1,
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <Text
              onPress={() => this.props.navigation.navigate("Login")}
            >Already have an account? Go to login</Text>
          </View>
        </Row>
      </Grid>
      </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}