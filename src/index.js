import React from 'react';
// import { View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView  } from 'react-native';
import { YellowBox } from "react-native";
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from './Screens/Login';
import SignUp from './Screens/SignUp';

import Account from './Screens/Account';
import Home from './Screens/Home';
import Shop from './Screens/Shop';
import Cart from './Screens/Cart';

import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import ChangePassword from './Screens/ChangePassword';

import OrderHistory from './Screens/OrderHistory';
import OrderHistoryDetails from './Screens/OrderHistoryDetails';
import PointHistory from './Screens/PointHistory';

import AddShippingAddress from './Screens/AddShippingAddress';
import ShippingAddressList from './Screens/ShippingAddressList';
import ShippingAddressDetails from './Screens/ShippingAddressDetails';
import EditShippingAddress from './Screens/EditShippingAddress';
import Product_details from './Screens/Product_details';

import Form from './Screens/Form';
import Lab from './Screens/Lab';

// export default () => <Login/>

// export default () => (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View
//           style={{
//               flex:1,
//               justifyContent:'center'
//           }}
//         >
//             <KeyboardAvoidingView style={{ flex:1}} keyboardVerticalOffset = {-100}  behavior="padding" enabled>
//                 <PageOne/>
//             </KeyboardAvoidingView>
            
//         </View>
//     </TouchableWithoutFeedback>
// );

// -------------------------------------------------------------------

// ignore specific yellowbox warnings
YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);

// ------------------------------navigation----------------------------

// Tab navigation for Home and Settings screens
const TabNavigation = createBottomTabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => <Icon
          name={focused ? 'home' : 'home'}
          size={26}
          style={{ color: tintColor }}
        />
      },
    },
    Shop: {
      screen: Shop,
      navigationOptions: {
        tabBarLabel: 'Shop',
        tabBarIcon: ({ tintColor, focused }) => <Icon
          name={focused ? 'search' : 'search'}
          size={26}
          style={{ color: tintColor }}
        />
      },
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
          tabBarLabel: 'Cart',
          tabBarIcon: ({ tintColor, focused }) => <Icon
            name={focused ? 'add-shopping-cart' : 'shopping-cart'}
            size={26}
            style={{ color: tintColor }}
          />,
        },
    },
    Account: {
        screen: Account,
        navigationOptions: {
          tabBarLabel: 'Account',
          tabBarIcon: ({ tintColor, focused }) => <Icon
            name={focused ? 'account-box' : 'account-box'}
            size={26}
            style={{ color: tintColor }}
          />
        },
    }, 
    

},{
    tabBarOptions: {
        activeTintColor: '#000',
        // inactiveTintColor: 'green',
        // activeBackgroundColor: 'yellow',
        // style:{backgroundColor:'red'}
    },
});
  
const AppContainer_TabNavigation = createAppContainer(TabNavigation);

//----------------------stack navigation----------------------------EditShippingAddress
const AppNavigator = createStackNavigator(
    {   
        // Cart: {
        //     screen: Cart,
        //     navigationOptions: () => ({
        //         // header:null,
        //         title:'Cart'
        //     }),
        // },
        
       
        
        Login: {
            screen: Login,
            navigationOptions: () => ({
                header:null,
                // title:'Your Profile'
            }),
        },  
        Tabs: {
            screen: AppContainer_TabNavigation,
            navigationOptions: () => ({
                header: null,               // Hide the header
            }),
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: () => ({
                header: null,               // Hide the header
            }),
        },        
        Profile: {
            screen: Profile,
            navigationOptions: () => ({
                // header: 'Your Profile',               // Hide the header
                title:'Your Profile'
            }),
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Edit Your Info'
            }),
        },
        ChangePassword: {
            screen: ChangePassword,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Edit Password'
            }),
        },
        OrderHistory: {
            screen: OrderHistory,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Order History'
            }),
        },   
        OrderHistoryDetails: {
            screen: OrderHistoryDetails,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Order History Details'
            }),
        }, 
        PointHistory: {
            screen: PointHistory,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Loyalty Points'
            }),
        },
        ShippingAddressList: {
            screen: ShippingAddressList,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Shipping Address List'
            }),
        },
        AddShippingAddress: {
            screen: AddShippingAddress,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Add Shipping Address'
            }),
        },
        EditShippingAddress: {
            screen: EditShippingAddress,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Edit Shipping Address'
            }),
        },
        ShippingAddressDetails: {
            screen: ShippingAddressDetails,
            navigationOptions: () => ({
                // header: null,               // Hide the header
                title:'Shipping Address Details'
            }),
        },
         
        Product_details: {
            screen: Product_details,
            navigationOptions: () => ({
                // header:null,
                title:'Product Details'
            }),
        },
        
        
        
    }
);
  
const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
