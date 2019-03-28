// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text> Tell me what other package is required in this project? </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// ------------------------------------------------------------------


// ----------------------------------------------------------------------



// export default props => (
//   <View
//     style={{
//       height:600,
//       width:'100%',
//       // alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor:'#e2e2e2'
//     }}
//   >
//   <Formik
//     // onSubmit={values => alert(JSON.stringify(values, null, 2))}
//     onSubmit={values => mishu(values)}
//     validationSchema = {validationSchema}
//   >
//     {props => {
//       return (
//         <InputsContainer style={{ padding: 10 }}
        
//         >
//           {/* email validation with formik */}
//           {/* <TextField 
//             label="email" 
//             onChangeText={text => props.setFieldValue("mishu", text)}
//             onBlur={()=>props.setFieldTouched("mishu")}
//             // error={props.errors.mishu}
//             error = {
//               props.touched.mishu || props.submitCount > 0 ? props.errors.mishu : null
//             }
//           /> */}

//           {/* email validation with react-native-formik */}
//           <FormikInput
//             label="email"
//             name="mishu"
//             type="email"
//           />


//           {/* password validation with formik */}
//           {/* <TextField 
//             label="password" 
//             onChangeText={ aftab => props.setFieldValue("password", aftab)}
//             onBlur = {()=>props.setFieldTouched("password")}
//             // error={props.errors.password}
//             error = {
//               props.touched.password || props.submitCount > 0 ? props.errors.password : null
//             }
//           /> */}

//           {/* password validation with react-native-formik */}
//           <FormikInput
//             label="password"
//             name="password"
//             type="password"
//           />
          
//           <Switch
//             label="If you like the repo, have you starred it 😁?"
//             name="star"
//           />


//           <RaisedTextButton
//             onPress={props.handleSubmit}
//             title="SUBMIT"
//             style={{
//               backgroundColor:'#fdd835',
//               color:'orange',
//               borderTopLeftRadius:10,
//               borderTopRightRadius: 10,
//             }}
//             titleColor='purple'
//           />

//           {/* <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text> */}
//         </InputsContainer>
//       );
//     }}
//   </Formik></View>
// );


//-----------------------------------------------------------------
// source: https://github.com/EQuimper/react-screencast/tree/master/form-handle-with-formik
//-----------------------------------------------------------------


// import React from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import { Button } from 'react-native-elements';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

// import Input from './src/components/Input';

// const api = user =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (user.email === 'hello@gmail.com') {
//         reject({ email: 'Email already use' });
//       } else {
//         resolve();
//       }
//     }, 3000);
//   });

// export default class App extends React.Component {
//   _handleSubmit = async (values, bag) => {
//     try {
//       await api(values);
//       Alert.alert('Welcome');
//     } catch (error) {
//       bag.setSubmitting(false);
//       bag.setErrors(error);
//     }
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Formik
//           initialValues={{ email: '', password: '', confirmPassword: '' }}
//           onSubmit={this._handleSubmit}
//           validationSchema={Yup.object().shape({
//             email: Yup.string()
//               .email('Not valid email')
//               .required('Email is required'),
//             password: Yup.string()
//               .min(6)
//               .required('Password is required'),
//             confirmPassword: Yup.string()
//               .oneOf(
//                 [Yup.ref('password', null)],
//                 'Confirm Password must matched Password',
//               )
//               .required('Confirm Password is required'),
//           })}
//           render={({
//             values,
//             handleSubmit,
//             setFieldValue,
//             errors,
//             touched,
//             setFieldTouched,
//             isValid,
//             isSubmitting,
//           }) => (
//             <React.Fragment>
//               <Input
//                 label="Email"
//                 autoCapitalize="none"
//                 value={values.email}
//                 onChange={setFieldValue}
//                 onTouch={setFieldTouched}
//                 name="email"
//                 error={touched.email && errors.email}
//               />
//               <Input
//                 label="Password"
//                 autoCapitalize="none"
//                 secureTextEntry
//                 value={values.password}
//                 onChange={setFieldValue}
//                 onTouch={setFieldTouched}
//                 name="password"
//                 error={touched.password && errors.password}
//               />
//               <Input
//                 label="Confirm Password"
//                 autoCapitalize="none"
//                 secureTextEntry
//                 value={values.confirmPassword}
//                 onChange={setFieldValue}
//                 onTouch={setFieldTouched}
//                 name="confirmPassword"
//                 error={touched.confirmPassword && errors.confirmPassword}
//               />
//               <Button
//                 backgroundColor="blue"
//                 buttonStyle={styles.button}
//                 title="Submit"
//                 onPress={handleSubmit}
//                 disabled={!isValid || isSubmitting}
//                 loading={isSubmitting}
//               />
//             </React.Fragment>
//           )}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     marginTop: 20,
//     width: '100%',
//   },
// });




// ---------------------------handlebar labs-------------------------------
// source: https://www.reactnativeschool.com/build-and-validate-forms-with-formik-and-yup/building-a-sign-in-form

// import React from 'react';
// import {
//   SafeAreaView,
//   TextInput,
//   Button,
//   ActivityIndicator,
//   Text,
//   View,
//   Switch,
// } from 'react-native';
// import { Formik } from 'formik';
// import * as yup from 'yup';

// const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
//   <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
//     <Text style={{ marginBottom: 3 }}>{label}</Text>
//     {children}
//     <Text style={{ color: 'red' }}>
//       {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
//     </Text>
//   </View>
// );

// const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
//   const inputStyles = {
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     marginBottom: 3,
//   };

//   if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
//     inputStyles.borderColor = 'red';
//   }

//   return (
//     <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
//       <TextInput
//         style={inputStyles}
//         onChangeText={formikProps.handleChange(formikKey)}
//         onBlur={formikProps.handleBlur(formikKey)}
//         {...rest}
//       />
//     </FieldWrapper>
//   );
// };

// const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
//   <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
//     <Switch
//       value={formikProps.values[formikKey]}
//       onValueChange={value => {
//         formikProps.setFieldValue(formikKey, value);
//       }}
//       {...rest}
//     />
//   </FieldWrapper>
// );

// const validationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .label('Email')
//     .email()
//     .required(),
//   password: yup
//     .string()
//     .label('Password')
//     .required()
//     .min(2, 'Seems a bit short...')
//     .max(10, 'We prefer insecure system, try a shorter password.'),
//   confirmPassword: yup
//     .string()
//     .required()
//     .label('Confirm password')
//     .test('passwords-match', 'Passwords must match ya fool', function(value) {
//       return this.parent.password === value;
//     }),
//   agreeToTerms: yup
//     .boolean()
//     .label('Terms')
//     .test(
//       'is-true',
//       'Must agree to terms to continue',
//       value => value === true
//     ),
// });

// const signUp = ({ email }) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (email === 'mishuraj27@gmail.com') {
//         reject(new Error("You playin' with that fake email address."));
//       }
//       resolve(true);
//     }, 1000);
//   });

// export default () => (
//   <SafeAreaView style={{ marginTop: 90 }}>
//     <Formik
//       initialValues={{
//         email: '',
//         password: '',
//         confirmPassword: '',
//         agreeToTerms: false,
//       }}
//       onSubmit={(values, actions) => {
//         signUp({ email: values.email })
//           .then(() => {
//             alert(JSON.stringify(values));
//           })
//           .catch(error => {
//             actions.setFieldError('general', error.message);
//           })
//           .finally(() => {
//             actions.setSubmitting(false);
//           });
//       }}
//       validationSchema={validationSchema}
//     >
//       {formikProps => (
//         <React.Fragment>
//           <StyledInput
//             label="Email"
//             formikProps={formikProps}
//             formikKey="email"
//             placeholder="johndoe@example.com"
//             autoFocus
//           />

//           <StyledInput
//             label="Password"
//             formikProps={formikProps}
//             formikKey="password"
//             placeholder="password"
//             secureTextEntry
//           />

//           <StyledInput
//             label="Confirm Password"
//             formikProps={formikProps}
//             formikKey="confirmPassword"
//             placeholder="confirm password"
//             secureTextEntry
//           />

//           <StyledSwitch
//             label="Agree to Terms"
//             formikKey="agreeToTerms"
//             formikProps={formikProps}
//           />

//           {formikProps.isSubmitting ? (
//             <ActivityIndicator />
//           ) : (
//             <React.Fragment>
//               <Button title="Submit" onPress={formikProps.handleSubmit} />
//               <Text style={{ color: 'red', textAlign:'center' }}>{formikProps.errors.general}</Text>
//             </React.Fragment>
//           )}
//         </React.Fragment>
//       )}
//     </Formik>
//   </SafeAreaView>
// );



// preparation for developing loyalty app
// source: https://github.com/bamlab/react-native-formik/blob/master/doc/formik_step_by_step.md#step-0-lets-start-with-a-simple-useless-form

// ---------------------------------------------------------------------


import React, {Component} from "react";
import { Text, View, Button } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { RaisedTextButton } from 'react-native-material-buttons';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Yup from "yup";
// import Switch from "./Switch";

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
    .min(6, "That can't be very secure"),
  // star: Yup.boolean()
  //   .required()
  //   .oneOf([true], "Feel free to submit an issue if you found some bugs!")

});

const mishu = (ripon) => {
  alert(JSON.stringify(ripon, null, 2));
}


export default class App extends Component{
  render(){
    return(
      // <View
      //   style={{
      //     flex:1,
      //     // alignItems: 'center',
      //     justifyContent: 'center',
      //     backgroundColor:'#FFFFFF'
      //   }}
      // >
      //   <Formik
      //     // onSubmit={values => alert(JSON.stringify(values, null, 2))}
      //     onSubmit={values => mishu(values)}
      //     validationSchema = {validationSchema}
      //   >
      //     {props => {
      //       return (
      //         <InputsContainer style={{ paddingLeft: 30, paddingRight:30}}
              
      //         >
      //           {/* email validation with formik */}
      //           {/* <TextField 
      //             label="email" 
      //             onChangeText={text => props.setFieldValue("mishu", text)}
      //             onBlur={()=>props.setFieldTouched("mishu")}
      //             // error={props.errors.mishu}
      //             error = {
      //               props.touched.mishu || props.submitCount > 0 ? props.errors.mishu : null
      //             }
      //           /> */}

      //           {/* email validation with react-native-formik */}
      //           <FormikInput
      //             label="Email/Phone"
      //             name="email"
      //             type="email"
      //             baseColor = "#000000"
      //             lineWidth = {1}
      //             labelFontSize = {20}
      //           />


      //           {/* password validation with formik */}
      //           {/* <TextField 
      //             label="password" 
      //             onChangeText={ aftab => props.setFieldValue("password", aftab)}
      //             onBlur = {()=>props.setFieldTouched("password")}
      //             // error={props.errors.password}
      //             error = {
      //               props.touched.password || props.submitCount > 0 ? props.errors.password : null
      //             }
      //           /> */}

      //           {/* password validation with react-native-formik */}
      //           <FormikInput
      //             label="Password"
      //             name="password"
      //             type="password"
      //             baseColor = "#000000"
      //             lineWidth = {1}
      //             labelFontSize = {20}
      //           />
                
      //           {/* <Switch
      //             label="If you like the repo, have you starred it 😁?"
      //             name="star"
      //           /> */}


      //           <RaisedTextButton
      //             onPress={props.handleSubmit}
      //             title="LogIn"
      //             style={{
      //               backgroundColor:'#000000',
      //               marginTop:25,   
      //               paddingTop:25,
      //               paddingBottom:25,          
      //             }}
      //             titleColor='#ffffff'
      //           />

      //           {/* <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text> */}
      //         </InputsContainer>
      //       );
      //     }}
      //   </Formik>
      // </View>
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
              onSubmit={values => mishu(values)}
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
                    
                    {/* <Switch
                      label="If you like the repo, have you starred it 😁?"
                      name="star"
                    /> */}


                    <RaisedTextButton
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

                    {/* <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text> */}
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
              <Text>Don't have an account? Click here</Text>
          </View>
        </Row>
      </Grid>
    );
  }
}