import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FlatMap from '../komponen/flatMap'

export default class Screen1 extends Component {
  //Screen1 Component
  render() {
    return (
      <View style={styles.MainContainer}>
        {/* <FlatMap id_rute={2}/> */}
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});