import React, { Component } from "react";
import { View,Text,StyleSheet, FlatList,Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class Tips_home extends Component {
    render() {
        const tips =[
            {
                "id": 1,
                "gambar_tips": "20200108113608.jpg",
                "judul_tips": "Kesehatan",
                "isi_tips": "Jaga kesehatan anda",
            }
        ]
        return (
            <View style={styles.container}>
                <FlatList
                data={tips}
                renderItem={({ item }) => 
                    <TouchableOpacity
                    style={{height:90,margin:10,padding:10,elevation:5,backgroundColor:'white',flexDirection:'row',borderRadius:10}}
                    onPress={()=>{
                        this.props.navigation.navigate('detailTips')
                    }}
                    >
                        <Image 
                        style={{height:'100%',width:90,resizeMode:'cover'}}
                        source={{uri:'https://gunung.sinudtech.web.id/public/image/'+item.gambar_tips}}
                        />

                        <View style={{marginLeft:15}}>
                            <Text style={{fontSize:18,fontWeight:'600',marginTop:3,color:'black'}}>{item.judul_tips}</Text>
                            <Text style={{fontSize:14,fontWeight:'600',color:'gray'}}>{item.isi_tips}</Text>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.id}
                />
            </View>
        );
    }
}
export default Tips_home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});