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
      selesai:false,
      scrollMaps:true

    }
  }
  componentDidMount() {
    this.ambilRute();
    setInterval(() => {
      if(!this.state.isLoading && !this.state.selesai){
        this.setState({
          selesai:true
        })
        // this.map.fitToElements(true);
      }
    }, 1000);
  }
  ambilRute=async()=>{
    let id_rute = this.props.id_rute;
    let scrollMaps  = this.props.scroll;
    
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
                    let dataRute = responseJson.data;
                    let ahir        = dataRute[dataRute.length-1];
                    data.push({
                      title:ahir.pos,
                      coordinates:{
                        latitude:parseFloat(ahir.lat),
                        longitude:parseFloat(ahir.lon),
                      }
                    })
                    let initialRegion={
                      latitude:parseFloat(ahir.lat),
                      longitude:parseFloat(ahir.lon),
                      latitudeDelta: 0.022,
                      longitudeDelta: 0.021,
                    }
                    if(scrollMaps==undefined){
                      this.setState({
                        scrollMaps:true
                      })
                    }else{
                        this.setState({
                          scrollMaps:scrollMaps
                        })
                    }
                    this.setState({
                      initialRegion:initialRegion,
                    })
                    this.setState({
                        isLoading:false,
                        markers:data,
                        
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
      <View style={{flex:1}}>
      <MapView 
        style={{flex:1}}
        ref={ref => { this.map = ref; }}
        initialRegion={this.state.initialRegion}
        scrollEnabled={this.state.scrollMaps}
      >
        {this.state.markers.map(marker => (
          <Marker 
            coordinate={marker.coordinates}
            title={marker.title}
          />
        ))}
      </MapView>
      </View>
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
