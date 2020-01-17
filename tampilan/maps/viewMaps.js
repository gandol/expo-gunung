import React, { Component } from "react";
import { View,Text,StyleSheet, ActivityIndicator} from "react-native";
import Map_screen_one from '../MapsGunung'

class ViewMpas extends Component {
    constructor(props){
        super();
        this.state={
            idGunung:'',
            isLoading:true
        }
    }
    componentDidMount(){
        this.getid();
    }

    getid(){
        let id          = this.props.navigation.getParam('id_gunung',null);
        if(id==null){
            this.props.navigation.goBack();
        }else{
            this.setState({
                isLoading:false,
                idGunung:id,
            })
        }
    }



    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading
                ? <ActivityIndicator/>
                :
                    <Map_screen_one id_rute={this.state.idGunung}/>
                }
            </View>
        );
    }
}
export default ViewMpas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});