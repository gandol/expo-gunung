import React, { Component } from "react";
import { View,Text,StyleSheet} from "react-native";
import Kompas from '../komponen/kompas'
class KompasScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                    <Kompas/>

            </View>
        );
    }
}
export default KompasScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});