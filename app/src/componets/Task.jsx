import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'



export default props => {


    const doneOrNotStyle = props.doneAt != null ?  {textDecorationLine: 'line-through'} : {}


    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatetedDate = moment(date).locale('pt-br')
    .format('ddd, D [de] MMMM')
        

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                 <Text style={styles.date}>{formatetedDate}</Text>
            </View>
            
        
        </View>
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
        paddingVertical: 10
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
    }
})