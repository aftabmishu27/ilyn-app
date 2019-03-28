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
});



class EditProfile extends Component{

    render(){
        // const id = 99;
        // const init_name = 'john snow';
        // const init_email = 'mishuraj27@gmail.com';

        // fetching data from profile
        const user_id = this.props.navigation.getParam('id', 'no data');
        const user_name = this.props.navigation.getParam('name', 'no data');
        const user_email = this.props.navigation.getParam('email', 'no data');

        const edit_data = ({ name, email }) => {
            return new Promise((resolve, reject) => {          
              setTimeout(() => {
                // fetching login data
                return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.users/${user_id}?vals={'name':'${name}','login':'${email}'}`,{method: 'PUT'})
                .then((response) => response.json())
                .then((responseJson) => {
                  // ["res.users"][0].name
                  // resolve(typeof(responseJson.code));
      
                //   if(typeof(responseJson.code) === "undefined"){
                //     resolve(responseJson);
                //   }else{
                //     reject(new Error("email and password doesn't match!"));
                //   }  
                    resolve(responseJson);          
                  
                })
                .catch((error) => {
                //   reject(new Error(error));
                    resolve(true);
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

                    initialValues={{ 
                        name: user_name,
                        email: user_email
                    }}

                    onSubmit={(values, actions) => {
                        edit_data({ name: values.name, email: values.email })
                        .then((data) => {
                            
                            // alert(JSON.stringify(values, null, 2));
                            alert('Your data successfully updated');
                            // let value = this.state.logData;
                            // this.setState({email: values.email, password:values.password})
                            // let value = this.state.logData;
                            // alert(JSON.stringify(data["res.users"][0]));

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
                            {/*    <Text style={{ color: 'red', textAlign:'center',marginTop:10, marginBottom:15 }}>{props.errors.general}</Text> */}
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

export default EditProfile;