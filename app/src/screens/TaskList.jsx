import AsyncStoreage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Component } from 'react'
import { Alert, FlatList, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { server, showError } from '../common'
import commonStyles from '../commonStyles'
import Task from '../componets/Task'
import AddTask from './AddTask'

import monthImage from '../../../assets/imgs/month.jpg'
import todayImage from '../../../assets/imgs/today.jpg'
import tomorrowImage from '../../../assets/imgs/tomorrow.jpg'
import weekImage from '../../../assets/imgs/week.jpg'


const initialState = {
    showDoneTask : true,
    showAddTask: false,
    visibleTask : [],
    tasks: []
}


export default class TaskList extends Component{

   state = {
        ...initialState
   }

   componentDidMount = async() => {
     const stateString =  await AsyncStoreage.getItem('state')
    const savedState = JSON.parse(stateString) || initialState
    this.setState({
        showDoneTask: savedState.showDoneTask
    }, this.filterTasks),

    this.loadTasks()
   }

   loadTasks = async () => {
        try{
            const maxDate = moment().add({days: this.props.daysAhead}).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: res.data}, this.filterTasks)
        }catch(e){
            showError(e)
            console.log(res)
        }
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
    AsyncStoreage.setItem('state', JSON.stringify({
        showDoneTask: this.state.showAddTask
    }))
   }

   toggleTask = async taskId => {
    try{
        await axios.put(`${server}/tasks/${taskId}/toggle`)
        await this.loadTasks()

    }catch(e){

    }
}

addTask = async (newTask) => {
    if(!newTask.desc || !newTask.desc.trim()){
        Alert.alert('Dados Inválidos', 'Descrição não informada!')
        return
    }

    try{
        await axios.post(`${server}/tasks`, {
            desc: newTask.desc,
            estimateAt: newTask.date
        })
        
    this.setState({ showAddTask: false}, this.loadTasks)

    }catch(e){
        showError(e)
    }


    
}

    deleteTask = async taskId => {
       try{
        await axios.delete(`${server}/tasks/${taskId}`)
         this.loadTasks()

       }catch(e){
        showError(e)
       }
    }

    getImage = () => {
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            case 30: return monthImage
        }
    }

    getColor = () => {
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }


    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({showAddTask: false})} onSave={this.addTask}>

                </AddTask>
                <ImageBackground source={this.getImage()} style={styles.background}>
                <View style={styles.iconBar}>
                   <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon name={this.state.showDoneTask ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary}></Icon>
                    </TouchableOpacity> 
                </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                   <FlatList data={this.state.visibleTask} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}></Task>}></FlatList>
                </View>
                <TouchableOpacity style={[styles.addButton, {backgroundColor: this.getColor()}]} activeOpacity={0.7} onPress={() => this.setState({showAddTask: true })}> 
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary}></Icon>
                </TouchableOpacity>
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

    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})