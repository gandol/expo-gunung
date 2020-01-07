import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer,createBottomTabNavigator } from 'react-navigation';
import PerlengkapanKelompok from './perlengkapan/kelompok';
import Individu from './perlengkapan/individu';
import P3k from './perlengkapan/p3k';


const TabNavigator = createBottomTabNavigator({
  Kelompok: {
    screen:PerlengkapanKelompok,
    navigationOptions:{
      tabBarLabel:"Kelompok",
    }
  },
  Pribadi: {
    screen:Individu,
    navigationOptions:{
      tabBarLabel:"Pribadi",
    }
  },
  P3K: {
    screen:P3k,
    navigationOptions:{
      tabBarLabel:"P3K",
    }
  }
},{
  tabBarOptions:{
		activeTintColor:'#3498db',
		inactiveTintColor:'#212020',
		pressColor:'white',
		style:{
      height:45,
      paddingTop:5,
      paddingBottom:10,
      paddingLeft:15,
      paddingRight:15
		},indicatorStyle:{
			height:0,
		},
		labelStyle:{
      fontSize:16,
      fontWeight:'500'
    },
    showIcon:true
	}
});

export default createAppContainer(TabNavigator);