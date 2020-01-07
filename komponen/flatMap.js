import React, { Component } from "react";
import { View,Text,StyleSheet, ActivityIndicator} from "react-native";

class FlatMap extends Component {
    constructor(props){
        super();
        this.state={
            ruteFlatdata:[],
            isLoading:true
        }
    }

    componentDidMount(){
        this.ambilRute()
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
                        console.log(responseJson)
                        this.setState({
                            isLoading:false,
                            ruteFlatdata:responseJson.data
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

        const dataPeta = this.state.ruteFlatdata
        const RenderData = dataPeta.slice(1,dataPeta.length)
        
        return (
            this.state.isLoading
            ?   <ActivityIndicator/>
            :
                <View style={styles.container}>
                    {RenderData.slice(0).reverse().map(data=>(
                        <View style={styles.panjang}>
                            <View style={styles.bulat}>
                                <Text style={{position:'absolute',width:100,marginLeft:25}}>{data.pos}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={styles.panjang}>
                        <View style={styles.bulat}>
                            <Text style={{position:'absolute',width:100,marginLeft:25}}>{this.state.ruteFlatdata[0].pos}</Text>
                        </View>
                        <View style={styles.bulatstart}>
                            <Text style={{position:'absolute',width:100,marginLeft:25}}>Start</Text>
                        </View>
                    </View>
                </View>
        );
    }
}
export default FlatMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    panjang:{
        backgroundColor:'black',
        width:10,
        height:80
    },
    bulat:{
        backgroundColor:'green',
        width:20,
        height:20,
        borderRadius:10,
        marginLeft:-5,
        marginTop:-10
    },
    bulatstart:{
        backgroundColor:'black',
        width:20,
        height:20,
        borderRadius:10,
        marginLeft:-5,
        marginTop:60
    }
});