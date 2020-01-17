import React, { Component } from "react";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { View,Text,StyleSheet, ActivityIndicator, TouchableOpacity,Dimensions} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FlatMap from '../komponen/flatMap'
import Map_screen from './Mapscreen'
import Map_screen_one from './MapsGunung'
import { LinearGradient } from 'expo-linear-gradient';
import getDirections from 'react-native-google-maps-directions'


const screenHeight = Math.round(Dimensions.get('window').height);

class RuteScreen extends Component {
    constructor(props){
        super();
        this.state={
            isLoading:true,
            idGunung:'',
            deskripsi:'',
            isModalVisible:false,
            showbaseCamp:false,
            latuser:0,
            longUser:0,
            endLat:0,
            endLong:0,
            getAhirDone:false
        }
    }

    componentDidMount(){
        this.ambilId();
        this._getLocationAsync()
    }

    ambilId(){
        let id          = this.props.navigation.getParam('id_rute',null)
        let deskrips    = this.props.navigation.getParam('deskripsi',null)
        if(id==null){
            this.props.navigation.goBack();
        }else{
            this.setState({
                isLoading:false,
                idGunung:id,
                deskripsi:deskrips,
            })
            this.ambilRute(id);
        }
    }
    ambilRute=async(id)=>{
        let id_rute     = id;
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
                        let data        = [];
                        let dataRute    = responseJson.data;
                        let ahir        = dataRute[dataRute.length-1];
                        this.setState({
                            endLat:parseFloat(ahir.lat),
                            endLong:parseFloat(ahir.lon),
                            getAhirDone:true
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

    static navigationOptions =({navigation}) => {
        const {params = {}} = navigation.state;
        let nama = navigation.getParam('nama_gunung',null)
        return{
            title: nama,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
            headerTitleStyle: { 
                textAlign:"center", 
                flex:1 ,
                marginLeft:-25,
            }
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('harap ijinkan aplikasi untuk mengambil lokasi anda di pengaturan')
        }
        else
        {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ 
                latuser:location.coords.latitude,
                longUser:location.coords.longitude
            });
        }
    
    };    
    handleGetDirections = () => {
        const data = {
           source: {
            latitude: this.state.latuser,
            longitude: this.state.longUser
          },
          destination: {
            latitude: this.state.endLat,
            longitude: this.state.endLong
          },
          params: [
            {
              key: "travelmode",
              value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
          ],
        }
     
        getDirections(data)
      }


    closeModal(){
        this.setState({
            isModalVisible:false
        })
    }

    render() {
        if(!this.state.showbaseCamp){
            return (
                this.state.isLoading
                ? <ActivityIndicator/>
                :
                <View style={styles.container}>
                    {/* <ScrollView>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#0088ff', '#00b3fa','#0088ff']}  style={{width:'100%',height:500,borderWidth:1.5,borderColor:'gray'}}>
                            <ScrollView>
                                <View style={{height:20}}></View>
                                <FlatMap id_rute={this.state.idGunung}/>
                                <View style={{height:20}}></View>
                            </ScrollView>
                        </LinearGradient>
                    </ScrollView> */}
                    <View style={{height:450,width:'100%',marginTop:10}}>
                            <Map_screen id_rute={this.state.idGunung}/>
                    </View>
                    <View style={{position:'absolute',flex:1,justifyContent:'flex-end',width:'100%',paddingLeft:10,paddingRight:10,flexDirection:'row',top:'95%',left:0,right:0,alignItems:'center',marginLeft:10}}>
                        <TouchableOpacity
                        style={{backgroundColor:'#d48004',height:55,width:'50%',alignItems:'center',justifyContent:'center',borderTopLeftRadius:15,elevation:5,borderRightColor:'black',borderRightWidth:0.5}}
                        onPress={()=>{
                            this.setState({
                                // isModalVisible:false
                            })
                        }}
                        >
                            <Text style={{fontSize:16,color:'black'}}>Info Rute</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{backgroundColor:'#FF9800',height:55,width:'50%',alignItems:'center',justifyContent:'center',borderTopRightRadius:15,elevation:5,borderLeftColor:'black',borderLeftWidth:0.5}}
                        onPress={()=>{
                            this.setState({
                                showbaseCamp:true
                            })
                        }}
                        >
                            <Text style={{fontSize:16,color:'white'}}>Info Basecamp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }else{
            return (
                this.state.isLoading
                ? <ActivityIndicator/>
                :
                <View style={styles.container}>
                    <ScrollView>
                        <View style={{width:'100%',height:200,borderWidth:1.5,borderColor:'gray'}}>
                            <ScrollView>
                                <View style={{height:'100%',alignItems:'center',padding:10}}>
                                    <Text>{this.state.deskripsi}</Text>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{height:200,width:'100%',marginTop:10}}>
                            <Map_screen_one id_rute={this.state.idGunung} scroll={false}/>
                        </View>

                        <View style={{height:30,width:'100%',marginTop:10,alignItems:'flex-end',flexDirection:'row',marginLeft:'60%',marginBottom:40}}>
                            <TouchableOpacity
                            style={{backgroundColor:'#FF9800',height:'100%',width:60,justifyContent:'center',alignItems:'center',marginRight:5}}
                            onPress={()=>{
                                this.props.navigation.navigate('infoMap',{
                                    id_gunung:this.state.idGunung,
                                })
                            }}
                            >
                                <Text style={{color:'white'}}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{backgroundColor:'#FF9800',height:'100%',width:60,justifyContent:'center',alignItems:'center'}}
                            onPress={()=>{
                                if(this.state.getAhirDone){
                                    this.handleGetDirections()
                                }else{
                                    alert('terjadi kesalahan')
                                }
                            }}
                            >
                                <Text style={{color:'white'}}>Navigate</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={{position:'absolute',flex:1,justifyContent:'flex-end',width:'100%',paddingLeft:10,paddingRight:10,flexDirection:'row',top:'95%',left:0,right:0,alignItems:'center',marginLeft:10}}>
                        <TouchableOpacity
                        style={{backgroundColor:'#FF9800',height:55,width:'50%',alignItems:'center',justifyContent:'center',borderTopLeftRadius:15,elevation:5,borderRightColor:'black',borderRightWidth:0.5}}
                        onPress={()=>{
                            this.setState({
                                showbaseCamp:false
                            })
                        }}
                        >
                            <Text style={{fontSize:16,color:'black'}}>Info Rute</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{backgroundColor:'#d48004',height:55,width:'50%',alignItems:'center',justifyContent:'center',borderTopRightRadius:15,elevation:5,borderLeftColor:'black',borderLeftWidth:0.5}}
                        onPress={()=>{
                            this.setState({
                                // isModalVisible:true
                            })
                        }}
                        >
                            <Text style={{fontSize:16,color:'black'}}>Info Basecamp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}
export default RuteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
    content:{
        backgroundColor:'white',
        padding:15,
        alignItems:'center'
    },
    view:{
        justifyContent: 'flex-start',
        margin: 0,
    }
});