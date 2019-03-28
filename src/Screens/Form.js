// import React from "react";
// import { Text, View } from "react-native";
// import { Formik } from "formik";
// import { TextField } from "react-native-material-textfield";

// export default props => (
//   <Formik>
//     {props => {
//       return (
//         <View style={{ padding: 10 }}>
//           <TextField 
//             label="email"
//             onChangeText={text => props.setFieldValue("mishu", text)}
//           />
//           <TextField label="password" />

//           <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
//         </View>
//       );
//     }}
//   </Formik>
// );



// import React from 'react';
// import { TextInput, View, Text } from "react-native";
// import { Formik } from "formik";
// import { compose } from "recompose";
// import makeInput, {
//   KeyboardModal,
//   withPickerValues
// } from "react-native-formik";

// const MyPicker = compose(
//   makeInput,
//   withPickerValues
// )(TextInput);

// export default props => (
//   <Formik
//     onSubmit={values => {
//       KeyboardModal.dismiss();
//       // console.log(values);
//     }}
//     render={props => {
//       return (
//         <View>
//           <MyPicker
//             label="select a value"
//             name="gender"
//             values={[
//               { label: "male", value: "Mr" },
//               { label: "female", value: "Mrs" }
//             ]}
//           />
//           <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
//         </View>
//       );
//     }}
//   />
// );


// ---------------------------------------------------------------

// import React, { Component } from 'react';
// import { Dropdown } from 'react-native-material-dropdown';

// class Example extends Component {
//   render() {
//     let data = [{
//       value: 'Banana',
//     }, {
//       value: 'Mango',
//     }, {
//       value: 'Pear',
//     }];

//     return (
//       <Dropdown
//         label='Favorite Fruit'
//         data={data}
//       />
//     );
//   }
// }

// export default Example;


// ------------------------------------------------------------------




import React, {Component} from "react";
import { Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
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
    Fruit: Yup.string()
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

const signUp = ({
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
        const partner_id = 24070;
        // posting sign up data
        return fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.partner?vals={'parent_id':${partner_id},'type':'delivery','name':'${name}','phone':'${pNumber}','street':'${address1}','street2':'${address2}','city':'${city}','state_id':'${state}','zip':'${zipCode}','country_id':20}`,{method: 'POST'})
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



export default class SignUp extends Component{
  constructor(props){
    super(props);
    this.state={
      drop_down_data:[],
    }
  }

  handlePickerData(){
    // api no 19. Get State List
    fetch(`http://128.199.225.144:8069/restapi/1.0/object/res.country.state?domain=[('country_id','=',20)]&fields=['id','display_name']`).then((response) => response.json())
    .then((responseJson) => {
      var count = Object.keys(responseJson["res.country.state"]).length;
      // console.warn(count);

      let drop_down_data = [];
      // for(var i=0;i<count;i++){
      //   // console.log(responseJson.message.Obj[i].name) // I need to add 
      //   drop_down_data.push({ value: responseJson["res.country.state"][0].id, label: responseJson["res.country.state"][0].display_name }); // Create your array of data
      // }
      responseJson["res.country.state"].map((data)=>{
        drop_down_data.push({ value: data.id, label: data.display_name });
      })
      // console.warn(drop_down_data);
      this.setState({ drop_down_data }); // Set the new state
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    this.handlePickerData();
  }

  render(){

    // let data = [{
    //   value: '1', label:'Banana',
    // }, {
    //   value: '2', label:'Mango',
    // }, {
    //   value: '3', label:'Pear',
    // }];

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
                        signUp({name: values.name, address1: values.address1 , address2: values.address2 , city: values.city , state: values.state , zipCode: values.zipCode , pNumber: values.pNumber })
                        .then((data) => {
                            // alert(JSON.stringify(data, null, 2));
                            alert("successfully add shipping address");
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

                        {/* State validation with react-native-formik */}
                        <FormikInput
                            label="State Code"
                            name="state"
                            keyboardType="number-pad"
                            baseColor = "#000000"
                            lineWidth = {1}
                            labelFontSize = {18}
                        />

                        <FormikPicker
                          label='Favorite Fruit'
                          name="Fruit"
                          data={this.state.drop_down_data}
                          itemColor="#000000"
                          selectedItemColor="#2196f3"
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

                       <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text> 
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



// ---------------------------------------------------------------------------------


// import React, { Component } from 'react';
// import { Text, View } from 'react-native';
// import { TextField } from 'react-native-material-textfield';
// import { Dropdown } from 'react-native-material-dropdown';


// export default class Example extends Component {
//     constructor(props) {
//       super(props);

//       this.onChangeText = this.onChangeText.bind(this);

//       this.codeRef = this.updateRef.bind(this, 'code');
//       this.nameRef = this.updateRef.bind(this, 'name');
//       this.sampleRef = this.updateRef.bind(this, 'sample');
//       this.typographyRef = this.updateRef.bind(this, 'typography');

//       this.state = {
//         sample: 'The quick brown fox jumps over the lazy dog',
//         typography: 'Headline',
//         name: 'Cyan',
//         code: 'A700',
//       };
//     }

//     onChangeText(text) {
//       ['name', 'code', 'sample', 'typography']
//         .map((name) => ({ name, ref: this[name] }))
//         .filter(({ ref }) => ref && ref.isFocused())
//         .forEach(({ name, ref }) => {
//           this.setState({ [name]: text });
//         });
//     }

//     updateRef(name, ref) {
//       this[name] = ref;
//     }

//     render() {
//       let { typography, name, code, sample } = this.state;

//       let textStyle = [
//         styles.text,
//         styles[typography],
//         styles[name + code],
//       ];

//       return (
//         <View style={styles.screen}>
//           <View style={styles.container}>
//             <TextField
//               ref={this.sampleRef}
//               value={sample}
//               onChangeText={this.onChangeText}
//               label='Sample text'
//               multiline={true}
//             />

//             <Dropdown
//               ref={this.typographyRef}
//               value={typography}
//               onChangeText={this.onChangeText}
//               label='Typography'
//               data={typographyData}
//             />

//             <View style={{ flexDirection: 'row' }}>
//               <View style={{ flex: 1 }}>
//                 <Dropdown
//                   ref={this.nameRef}
//                   value={name}
//                   onChangeText={this.onChangeText}
//                   label='Color name'
//                   data={colorNameData}
//                 />
//               </View>

//               <View style={{ width: 96, marginLeft: 8 }}>
//                 <Dropdown
//                   ref={this.codeRef}
//                   value={code}
//                   onChangeText={this.onChangeText}
//                   label='Color code'
//                   data={colorCodeData}
//                   propsExtractor={({ props }, index) => props}
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={[styles.container, styles.textContainer]}>
//             <Text style={textStyle}>{sample}</Text>
//           </View>
//         </View>
//       );
//     }
//   }



// const styles = {
//   screen: {
//     flex: 1,
//     padding: 4,
//     paddingTop: 56,
//     backgroundColor: '#E8EAF6',
//   },

//   container: {
//     marginHorizontal: 4,
//     marginVertical: 8,
//     paddingHorizontal: 8,
//   },

//   text: {
//     textAlign: 'center',
//   },

//   textContainer: {
//     backgroundColor: 'white',
//     borderRadius: 2,
//     padding: 16,
//     elevation: 1,
//     shadowRadius: 1,
//     shadowOpacity: 0.3,
//     justifyContent: 'center',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//   },

//   Display2: { fontSize: 45 },
//   Display1: { fontSize: 34 },
//   Headline: { fontSize: 24 },
//   Title: { fontSize: 20, fontWeight: '500' },
//   Subheading: { fontSize: 16 },
//   Body: { fontSize: 14 },
//   Caption: { fontSize: 12 },

//   Blue900: { color: '#0D47A1' },
//   Blue700: { color: '#1976D2' },
//   BlueA700: { color: '#2962FF' },
//   BlueA400: { color: '#2979FF' },

//   Teal900: { color: '#004D40' },
//   Teal700: { color: '#00796B' },
//   TealA700: { color: '#00BFA5' },
//   TealA400: { color: '#1DE9B6' },

//   Cyan900: { color: '#006064' },
//   Cyan700: { color: '#0097A7' },
//   CyanA700: { color: '#00E5FF' },
//   CyanA400: { color: '#00B8D4' },
// };

// const typographyData = [
//   { value: 'Display2', label: 'Display 2' },
//   { value: 'Display1', label: 'Display 1' },
//   { value: 'Headline' },
//   { value: 'Title' },
//   { value: 'Subheading' },
//   { value: 'Body' },
//   { value: 'Caption' },
// ];

// const colorNameData = [
//   { value: 'Blue' },
//   { value: 'Teal' },
//   { value: 'Cyan' },
// ];

// const colorCodeData = [
//   { value: '900', props: { disabled: true } },
//   { value: '700' },
//   { value: 'A700' },
//   { value: 'A400' },
// ];
