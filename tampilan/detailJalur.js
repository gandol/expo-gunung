import React, { Component } from "react";
import { TouchableOpacity,Text,StyleSheet, ActivityIndicator} from "react-native";
import { FlatGrid } from 'react-native-super-grid';
class detailJalur extends Component {
    constructor(props){
        super();
        this.state={
            dataJalur:[],
            isLoading:true
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

    componentDidMount(){
        this.ambilJalurgunung();
    }

    ambilJalurgunung=async()=>{
        let dataPost = new FormData();
        let idgunung = this.props.navigation.getParam('id_gunung',null)
        dataPost.append('id_gunung',idgunung);
        let data ={
            method:'POST',
            data:dataPost
        }
        fetch(global.apiUrl+'api/v1/rute',data)
        .then((respon)=>{
            if(respon.ok){
                respon.json().then((responseJson)=>{
                    if(responseJson.status==200 && responseJson.message=='Success'){
                        this.setState({
                            isLoading:false,
                            dataJalur:responseJson.data
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
            this.state.isLoading ?
                <ActivityIndicator/>
            :
            <FlatGrid
            itemDimension={130}
            items={this.state.dataJalur}
            style={styles.gridView}
            renderItem={({ item, index }) => (
            <TouchableOpacity
            style={[styles.itemContainer]}
            onPress={()=>{
                this.props.navigation.navigate('ruteMap',{
                    id_gunung:item.id
                })
            }}
            >
                <Text style={styles.itemName}>{item.nama_rute}</Text>
                {/* <Text style={styles.itemCode}>{item.code}</Text> */}
            </TouchableOpacity>
            )}
        />
        );
    }
}
export default detailJalur;

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
      
    },
    itemContainer: {
      justifyContent: 'flex-end',
      alignItems:'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
      borderColor:'black',
      borderWidth:1,


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
});
  