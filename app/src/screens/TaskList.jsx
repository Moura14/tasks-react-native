import { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import commonStyles from '../commonStyles'
import Task from '../componets/Task'

import moment from 'moment'
import 'moment/locale/pt-br'




export default class TaskList extends Component{
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/imgs/today.jpg')} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Task desc='Comprar livro' estimateAt={new Date()} doneAt={new Date()}></Task>
                    <Task desc='Jogar um futevôlei de cria' estimateAt={new Date()} doneAt={null} ></Task>
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
    
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    }
})