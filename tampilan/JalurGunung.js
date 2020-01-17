import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { TouchableOpacity } from "react-native-gesture-handler";

class JalurGunung extends Component {
    constructor(props){
        super();
        this.state={
            datagunung:[],
            isLoading:true
        }
    }
    componentDidMount(){
        this.ambildatagunung()
    }
    ambildatagunung=async()=>{
        let data ={
            method:'POST',
        }
        fetch(global.apiUrl+'api/v1/gunung',data)
        .then((respon)=>{
            if(respon.ok){
                respon.json().then((responseJson)=>{
                    if(responseJson.status==200 && responseJson.message=='Success'){
                        this.setState({
                            isLoading:false,
                            datagunung:responseJson.data
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
            this.state.isLoading?
                <ActivityIndicator/>
            :
                <FlatGrid
                    itemDimension={130}
                    items={this.state.datagunung}
                    style={styles.gridView}
                    renderItem={({ item, index }) => (
                    <TouchableOpacity
                    style={[styles.itemContainer]}
                    onPress={()=>{
                        this.props.navigation.navigate('ruteGunung',{
                            id_gunung:item.id,
                            nama_gunung:item.nama_gunung
                        })
                    }}
                    >
                        <Image
                        source={{uri:'https://gunung.sinudtech.web.id/public/image/'+item.gambar_gunung}}
                        style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:5}}
                        />
                        <View style={styles.teksBawah}>
                            <Text style={styles.itemName}>{item.nama_gunung}</Text>
                        </View>
                        {/* <Text style={styles.itemCode}>{item.code}</Text> */}
                    </TouchableOpacity>
                    )}
                />
        );
    }
}
export default JalurGunung;

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
      
    },
    itemContainer: {
      justifyContent: 'flex-start',
      alignItems:'center',
      borderRadius: 5,
    //   padding: 10,
      height: 150,
      elevation:5
    //   borderColor:'black',
    //   borderWidth:1,


    },
    itemName: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    teksBawah:{
        position:'absolute',
        backgroundColor:'white',
        width:'100%',
        marginTop:110,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        opacity:0.8
    }
});
  