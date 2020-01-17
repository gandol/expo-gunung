import React, { Component } from "react";
import { View,Text,StyleSheet, Image, ScrollView, ActivityIndicator} from "react-native";

class DetailTips extends Component {
    constructor(props){
        super();
        this.state={
            isLoading:true,
            dataTips:[]
        }
    }

    componentDidMount(){
        this.ambilTips();
    }

    ambilTips=async()=>{
        let data ={
            method:'POST',
        }
        fetch(global.apiUrl+'api/v1/tips',data)
        .then((respon)=>{
            if(respon.ok){
                respon.json().then((responseJson)=>{
                    if(responseJson.status==200 && responseJson.message=='Success'){
                        this.setState({
                            isLoading:false,
                            dataTips:responseJson.data
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
        const tips = this.state.dataTips
        return (
            <View style={styles.container}>
                {this.state.isLoading
                ? <ActivityIndicator/>
                :
                    <ScrollView>
                        <Image
                        source={{uri:'https://gunung.sinudtech.web.id/public/image/'+tips[0].gambar_tips}}
                        style={{width:'100%',height:190}}
                        />
                        <View
                        style={{paddingLeft:10,paddingRight:10,marginTop:15}}
                        >
                            <Text style={{color:'black',fontSize:19,fontWeight:'600'}}>{tips[0].judul_tips}</Text>
                            <Text style={{color:'black',fontSize:14,fontWeight:'400',marginTop:5}}>{tips[0].isi_tips}</Text>
                        </View>

                    </ScrollView>
                }
            </View>
        );
    }
}
export default DetailTips;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});