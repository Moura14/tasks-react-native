import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

import moment from 'moment';
import 'moment/locale/pt-br';



export default props => {


    const doneOrNotStyle = props.doneAt != null ?  {textDecorationLine: 'line-through'} : {}


    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatetedDate = moment(date).locale('pt-br')
    .format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name='trash' size={30} color='#FFF'></Icon>
            </TouchableOpacity>
        )
    }

     const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name='trash' size={20} color='#FFF' style={styles.excludeIcon} ></Icon>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }
        

    return (
       <GestureHandlerRootView style={{flex: 1}}>
            <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
                  <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                 <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                 <Text style={styles.date}>{formatetedDate}</Text>
            </View>
        </View>
            </Swipeable>
       </GestureHandlerRootView>
        
    )
}

function getCheckView(doneAt){
    if(doneAt != null){
    return (
        <View style={styles.done}>
            <Icon name='check' size={20} color='#FFF'></Icon>
        </View>
    )
    }else{
        return (
            <View style={styles.pending}></View> 
        )
    }
   
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center'
    },
    pending: {
        height: 25, 
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
       backgroundColor: 'red' ,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-end',
       paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft: 10
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }

})