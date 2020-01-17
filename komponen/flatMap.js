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

        const dataPeta      = this.state.ruteFlatdata
        const RenderData    = dataPeta.slice(1,dataPeta.length)
        return (
            this.state.isLoading
            ?   <ActivityIndicator/>
            :
                <View style={styles.container}>
                    {dataPeta.reverse().map((data,number)=>{
                        if(number%2==0){
                            return(
                                <View style={styles.base}>
                                    <View style={styles.panjang}>
                                        <View style={styles.bulat}>
                                            <View style={{position:'absolute',width:120,marginLeft:10,alignItems:'flex-start',transform:[{ rotate: '-35deg' }],marginTop:-40}}>
                                                <Text>{data.pos}</Text>
                                            </View>
                                        </View>
                                    </View>
        
                                </View>
                            )
                        }else{
                                return(
                                    <View style={styles.baseBalik}>
                                        <View style={styles.panjang}>
                                            <View style={styles.bulat}>
                                                <View style={{position:'absolute',width:120,marginLeft:-120,alignItems:'flex-end',transform:[{ rotate: '30deg' }],marginTop:-40}}>
                                                    <Text>{data.pos}</Text>
                                                </View>
                                            </View>
                                        </View>
            
                                    </View>
                                )
                        }
                        
                        
                    }
                    )
                    }
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
        height:100,
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
    },
    base:{
        height:100,
        width:100,
        alignItems:'center',
        transform:[
            // { perspective: 850 },
            { rotate: '35deg' }
        ],
    },
    baseBalik:{
        height:100,
        width:100,
        alignItems:'center',
        transform:[
            { rotate: '-30deg' }
        ],
        marginTop:-13,
        marginBottom:-10,
    }
});