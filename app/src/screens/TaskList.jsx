import { Component } from 'react'
import { FlatList, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import commonStyles from '../commonStyles'
import Task from '../componets/Task'

import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'




export default class TaskList extends Component{

   state = {
    showDoneTask : true,
    visibleTask : [],
    tasks: [{
        id: Math.random(),
        desc: 'Comprar livro',
        estimateAt: new Date(),
        doneAt: new Date()
    }, {
        id: Math.random(),
        desc: 'Jogar um futevôlei de cria',
        estimateAt: new Date(),
        doneAt: null
    }

]
   }

   componentDidMount = () => {
        this.filterTasks()
   }

   toggleFilter = () => {
        this.setState({showDoneTask: !this.state.showDoneTask}, this.filterTasks)
   }

   filterTasks = () => {
    let visibleTask = null
    if(this.state.showDoneTask){
        visibleTask = [...this.state.tasks]
    }else{
        const peding = task => task.doneAt === null
        visibleTask = this.state.tasks.filter(peding)

    }

    this.setState({visibleTask})
   }

   toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
        if(task.id == taskId){
            task.doneAt = task.doneAt ? null : new Date()
        }
    })

    this.setState({tasks}, this.filterTasks)
}


    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/imgs/today.jpg')} style={styles.background}>
                <View style={styles.iconBar}>
                   <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon name={this.state.showDoneTask ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary}></Icon>
                    </TouchableOpacity> 
                </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                   <FlatList data={this.state.visibleTask} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}></Task>}></FlatList>
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10

    }
})