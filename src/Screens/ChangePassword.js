import React, { Component } from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView,
    StatusBar,
    Dimensions
} from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { RaisedTextButton } from 'react-native-material-buttons';
import { Row, Grid } from "react-native-easy-grid";
import * as Yup from "yup";


const screen = Dimensions.get('window');

const FormikInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const InputsContainer = withNextInputAutoFocusForm(View)

const validationSchema = Yup.object().shape({
    cPassword: Yup.string()
    .required('This is a required field'),
    nPassword: Yup.string()
    .required('This is a required field')
    .min(4, "That can't be very secure"),
});



class ChangePassword extends Component{

    render(){

        // fetching data from profile
        const user_id = this.props.navigation.getParam('id', 'no data');
        const user_email = this.props.navigation.getParam('email', 'no data');

        const change_password = ({ cPassword, nPassword }) => {
            return new Promise((resolve, reject) => {          
              setTimeout(() => {
                // fetching login data
                // 17. Get Current Password
                return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.users?domain=[('login','=','${user_email}'),('passkey','=','${cPassword}'),('customer','=',True)]&fields=['id','login']`)
                .then((response) => response.json())
                .then((responseJson) => {
                  // ["res.users"][0].name
                  // resolve(typeof(responseJson.code));
      
                    if(typeof(responseJson.code) === "undefined"){
                        // resolve(responseJson);
                        // 18. Edit Password
                        return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.users/${user_id}?vals={'password':'${nPassword}'}`,{method: 'PUT'})
                        .then((response) => response.json())
                        .then((responseJson) => {
                            // ["res.users"][0].name
                            // resolve(typeof(responseJson.code));
                
                            // if(typeof(responseJson.code) === "undefined"){
                            //     resolve(responseJson);
                            // }else{
                            //     reject(new Error("Current password is wrong"));
                            // } 

                            resolve(true);           
                        
                        })
                        .catch((error) => {
                            // reject(new Error(error));
                            resolve(true);     
                        });

                    }else{
                        reject(new Error("Current password is wrong"));
                    } 

                    // resolve(responseJson);           
                  
                })
                .catch((error) => {
                  reject(new Error("Bad newtwork server, try again"));
                });
      
              }, 1000);
            });
      
        }

        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Formik
                    // onSubmit={values => alert(JSON.stringify(values, null, 2))}

                    // onSubmit={values => mishu(values)}

                    // initialValues={{ email: 'mishuraj27@gmail.com' }}

                    onSubmit={(values, actions) => {
                        change_password({ cPassword: values.cPassword, nPassword: values.nPassword })
                        .then((data) => {
                            
                            // alert(JSON.stringify(values, null, 2));
                            alert('Your password updated');
                            // let value = this.state.logData;
                            // this.setState({email: values.email, password:values.password})
                            // let value = this.state.logData;
                            // alert(JSON.stringify(value["res.users"][0].name));

                            // alert(JSON.stringify(data, null, 2));
                            // {() => this.props.navigation.navigate("Welcome")}

                            // return this.props.navigation.navigate("Tabs", { name: data });
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
                        <InputsContainer style={{ paddingHorizontal:30 }} >

                            <FormikInput
                                label="Current Password"
                                name="cPassword"
                                type="password"
                                baseColor = "#000000"
                                lineWidth = {1}
                                labelFontSize = {18}
                            />

                            <FormikInput
                                label="New Password"
                                name="nPassword"
                                type="password"
                                baseColor = "#000000"
                                lineWidth = {1}
                                labelFontSize = {18}
                            />
                            
                            <RaisedTextButton
                                // onPress={() => this.props.navigation.navigate("Welcome")}
                                onPress={props.handleSubmit}
                                
                                title="Save"
                                titleStyle={{
                                    fontSize:16
                                }}
                                style={{
                                    backgroundColor:'#000000',
                                    marginTop:25,   
                                    paddingTop:20,
                                    paddingBottom:20,
                                    borderRadius: 5,
                                    width:screen.width/4,
                                    alignSelf:'flex-end'
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
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:10
    }
});

export default ChangePassword;