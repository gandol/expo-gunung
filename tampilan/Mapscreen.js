import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";
// import getDirections from 'react-native-google-maps-directions'
import MapView,{Polyline,Marker} from 'react-native-maps';
import Testing from '../komponen/Tes'

class MapsScreen extends React.Component {
  constructor(props){
    super();
    this.state={
      markers: [],
      initialRegion:null,
      polylines: [],
      markerBaru:[],
      selesai:false

    }
  }
  componentDidMount() {
    this.ambilRute();
    setInterval(() => {
      if(!this.state.isLoading && !this.state.selesai){
        this.setState({
          selesai:true
        })
        this.map.fitToElements(true);
      }
    }, 1000);
  }
  ambilRute=async()=>{
    let id_rute = this.props.id_rute;
    let formpost    = new FormData();
    formpost.append('id_rute',id_rute);

    let dataposting ={
        method:'POST',
        body:formpost
    }
    fetch(global.apiUrl+'api/v1/rute_detail',dataposting)
    .then((respon)=>{
        if(respon.ok){
            respon.json().then((responseJson)=>{
                if(responseJson.status==200 && responseJson.message=='Success'){
                    let data = [];
                    let poli = [];
                    responseJson.data.map(datajson=>{
                      data.push({
                        title:datajson.pos,
                        coordinates:{
                          latitude:parseFloat(datajson.lat),
                          longitude:parseFloat(datajson.lon),
                        }
                      })
                      poli.push({
                          latitude:parseFloat(datajson.lat),
                          longitude:parseFloat(datajson.lon),
                      })
                      
                      if(datajson.pos.toLowerCase()=='start'){
                        let initialRegion={
                          latitude:parseFloat(datajson.lat),
                          longitude:parseFloat(datajson.lon),
                          latitudeDelta: 0.022,
                          longitudeDelta: 0.021,
                        }
                        this.setState({
                          initialRegion:initialRegion
                        })
                      }
                    })
                    this.setState({
                        isLoading:false,
                        markers:data,
                        polylines:poli
                        
                    })
                }
            })

        }else{
            this.setState({
                isLoading: false,
            })
        }
    })
  }


  render() {
    return (
      // <View></View>
      <View style={{flex:1}}>
      <MapView 
        style={{flex:1}}
        ref={ref => { this.map = ref; }}
        initialRegion={this.state.initialRegion}
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
          coordinates={this.state.polylines}
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
      {/* <View style={{position:'absolute',backgroundColor:'transparent',marginTop:'150%',marginLeft:'70%'}}>
        <Testing/>
      </View> */}

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
