import React, { Component } from 'react';
import { View, Image, TouchableOpacity,Text,ScrollView } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  SafeAreaView,DrawerItems,
  createMaterialTopTabNavigator
} from 'react-navigation';
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Screen1 from './tampilan/screen1';
import JalurGunung from './tampilan/JalurGunung';
import detailJalur from './tampilan/detailJalur'
import jalurMap from './tampilan/Mapscreen'
import ruteMap from './tampilan/rute'
import KompasScreen from './tampilan/Kompas'
import Perlengkapan from './tampilan/Perlengkapan'
import Screen3 from './tampilan/screen1';
import Icon from 'react-native-vector-icons/Entypo'

import perlengkapanKelompok from './tampilan/perlengkapan/kelompok'

class NavigationDrawerStructure extends Component {
  constructor(props){
    super();
    global.apiUrl='https://gunung.sinudtech.web.id/'
  }


  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
        <Icon name="menu"
            style={{marginLeft:10}}
            size={35} color="black"/>
        </TouchableOpacity>
      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      title: 'HOME',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 ,
        marginLeft:-45,
      }
    }),
  },
});


const jalur_gunung = createStackNavigator({
  Second: {
    screen: JalurGunung,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      title: 'Jalur Gunung',
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 ,
        marginLeft:-45,
      }
    }),
  },
  ruteGunung:{
    screen:detailJalur,
  },
  ruteMap:{
    screen:ruteMap
  }
});
const perlengkapan_tab = createMaterialTopTabNavigator({
  kelompok:{
    screen:perlengkapanKelompok
  }
})
const kompas = createStackNavigator({
  kompas: {
    screen: KompasScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      title: 'Kompas',
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 ,
        marginLeft:-45,
      }
    }),
  },
  ruteGunung:{
    screen:detailJalur,
  },
  ruteMap:{
    screen:ruteMap
  }
});
const perlengkapan = createStackNavigator({
  perlengkapan: {
    screen: Perlengkapan,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      title: 'Perlengkapan',
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 ,
        marginLeft:-45,
      }
    }),
  },
  ruteGunung:{
    screen:detailJalur,
  },
  ruteMap:{
    screen:jalurMap
  }
});

const Screen3_StackNavigator = createStackNavigator({
  Third: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 3',
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator({
  Screen1: {
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },

  Screen2: {
    screen: jalur_gunung,
    navigationOptions: {
      drawerLabel: 'Jalur Gunung',
    },
  },

  Screen3: {
    screen: perlengkapan,
    navigationOptions: {
      drawerLabel: 'Perlengkapan',
    },
  },
  Screen4: {
    screen: Screen3_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Tips Mendaki',
    },
  },
  Screen5: {
    screen: kompas,
    navigationOptions: {
      drawerLabel: 'Kompas',
    },
  },
},{
  contentComponent: (props) => (
   <SafeAreaView style={{flex:1}}>
       <View style={{height: 100,alignItems: 'center', justifyContent: 'center',marginTop:23}}>

         <Text style={{fontSize: 32}}>INFO Gunung</Text>
       </View>
     <ScrollView>
       <DrawerItems {...props} />
     </ScrollView>
   </SafeAreaView>
  )
});

export default createAppContainer(DrawerNavigatorExample);
