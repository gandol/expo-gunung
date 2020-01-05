import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";
import getDirections from 'react-native-google-maps-directions'
import MapView,{Polyline,Marker} from 'react-native-maps';
import Testing from '../komponen/Tes'

class MapsScreen extends React.Component {
  constructor(props){
    super();
    this.state={
      markers: [{
        title: 'Titik pertama',
        coordinates: {
          latitude:  -7.304514,
          longitude: 109.226386
        },
      },
      {
        title: 'Titik kedua',
        coordinates: {
          latitude: -7.304663,
          longitude: 109.225077
        },  
      }
    ],
    polylines: [
      {
        id:1,
        coordinates: {
          latitude:  -7.304514,
          longitude: 109.226386
        },
      },
      {
        id:1,
        coordinates: {
          latitude:  -7.304514,
          longitude: 109.226386
        },
      }
    ],

    }
  }
  componentDidMount() {
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
    console.log('holaaa')
  }
  handleGetDirections = () => {
    const data = {
       source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      waypoints: [
        {
          latitude: -33.8600025,
          longitude: 18.697452
        },
        {
          latitude: -33.8600026,
          longitude: 18.697453
        },
           {
          latitude: -33.8600036,
          longitude: 18.697493
        }
      ]
    }
    getDirections(data)
  }
    

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      // <View></View>
      <View style={{flex:1}}>
      <MapView 
        style={{flex:1}}
        initialRegion={{
          latitude: -7.305333,
          longitude: 109.225721,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        {this.state.markers.map(marker => (
          <Marker 
            coordinate={marker.coordinates}
            title={marker.title}
            onPress={()=>{
              console.log(marker.title)
            }}
            onCalloutPress={()=>{
              console.log('tidak ada yang di select')
            }}
          />
        ))}
        <Polyline
          coordinates={[
            { latitude: -7.305333, longitude: 109.225721 },
            { latitude:-7.304514, longitude: 109.226386 },
            // { latitude: 37.7665248, longitude: -122.4161628 },
            // { latitude: 37.7734153, longitude: -122.4577787 },
            // { latitude: 37.7948605, longitude: -122.4596065 },
            // { latitude: 37.8025259, longitude: -122.4351431 }
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeWidth={6}
        />
      </MapView>
      <View style={{position:'absolute',backgroundColor:'transparent',marginTop:'150%',marginLeft:'70%'}}>
        <Testing/>
      </View>

      </View>
      // <View style={styles.animationContainer}>
      //   <LottieView
      //     style={{
      //       width:'100%',
      //       justifyContent:'center',
      //       alignItems:'center',
      //       height:500,
            
      //     }}
      //     autoPlay loop
      //     source={require('./assets/basket.json')}
      //     // OR find more Lottie files @ https://lottiefiles.com/featured
      //     // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      //   />
      //   <Button onPress={this.handleGetDirections} title="Get Directions" />
      // </View>
    );
  }
}

export default MapsScreen;

const styles = StyleSheet.create({
  animationContainer: {
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
