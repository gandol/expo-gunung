import React, { Component } from "react";
import { View,Text,StyleSheet,FlatList, ActivityIndicator, Image} from "react-native";

class Individu extends Component {
    constructor(props){
        super();
        this.state={
            dataPerlengkapan:[],
            isLoading:true
        }
    }
    

    componentDidMount(){
        this.ambildataPerlengkapan()
    }
    ambildataPerlengkapan=async()=>{
        let data        = new FormData();
        data.append('kelompok','pribadi');

        let postData = {
            method:'POST',
            body:data,
        }

        fetch(global.apiUrl+'api/v1/perlengkapan',postData)
        .then((respon)=>{
            if(respon.ok){
                respon.json().then((responseJson)=>{
                    if(responseJson.status==200 && responseJson.message=='Success'){
                        this.setState({
                            isLoading:false,
                            dataPerlengkapan:responseJson.data
                        })
                    }
                })

            }else{
                this.setState({
                    isLoading: false,
                })
                alert("Terjadi kesalahn");
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading
                ? <ActivityIndicator/>
                :
                <FlatList
                    data={this.state.dataPerlengkapan}
                    renderItem={({ item }) => 
                        <View style={{height:80,margin:10,padding:10,elevation:5,backgroundColor:'white',flexDirection:'row',borderRadius:10}}>
                            <Image 
                            style={{height:'100%',width:60,borderRadius:30,resizeMode:'cover'}}
                            source={{uri:'https://gunung.sinudtech.web.id/public/image/'+item.gambar_perlengkapan}}
                            />

                            <View style={{marginLeft:15}}>
                                <Text style={{fontSize:18,fontWeight:'600',marginTop:3,color:'black'}}>{item.nama_perlengkapan}</Text>
                                <Text style={{fontSize:14,fontWeight:'600',color:'gray'}}>{item.deskripsi}</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
                }
            </View>
        );
    }
}
export default Individu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});