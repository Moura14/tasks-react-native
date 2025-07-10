import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default props => {
    return (
        <View style={[styles.container]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput
                {...props}
                style={[styles.input, props.style]} // <- estilo externo aplicado aqui
             // também opcional
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#333',
        marginLeft: 20,
    },
    input: {
        marginLeft: 20,
        width: '70%',
       
    },
});
