import { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'




export default class TaskList extends Component{
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/imgs/today.jpg')} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text>Hoje</Text>
                        <Text>{today}</Text>
                    </View>
                </ImageBackground>
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
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})