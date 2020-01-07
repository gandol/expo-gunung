import React, { Component } from "react";
import { View,Text,StyleSheet, ActivityIndicator} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FlatMap from '../komponen/flatMap'
import Map_screen from './Mapscreen'
class RuteScreen extends Component {
    constructor(props){
        super();
        this.state={
            isLoading:true,
            idGunung:'',
            deskripsi:''
        }
    }

    componentDidMount(){
        this.ambilId()
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
                deskripsi:deskrips
            })
        }
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

    render() {
        return (
            this.state.isLoading
            ? <ActivityIndicator/>
            :
            <View style={styles.container}>
                <ScrollView>
                    <View style={{width:'100%',height:200,borderWidth:1.5,borderColor:'gray'}}>
                        <ScrollView>
                            <View style={{height:20}}></View>
                            <FlatMap id_rute={this.state.idGunung}/>
                            <View style={{height:20}}></View>
                        </ScrollView>
                    </View>
                    <View style={{height:170,alignItems:'center',padding:10}}>
                        <Text>{this.state.deskripsi}</Text>
                    </View>
                    <View style={{height:300,width:'100%'}}>
                        <Map_screen/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default RuteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    }
});