import { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'




export default class TaskList extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/imgs/today.jpg')} style={styles.background}></ImageBackground>
                <View style={styles.taskList}>
                    <Text>TaskList</Text>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    }
})