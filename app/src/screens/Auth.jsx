import React, { Component } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import backgroundImage from '../../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../componets/AuthInput';

import axios from 'axios';
import { server, showError, showSuccess } from '../common';

const initialState = {
        name : '',
        email: '',
        password: '',
        confirmPassword: '',
        stateNew: false
}


export default class Auth extends Component {

    state = {
       ...initialState
    }


    signinOrSingup = () => {
        if(this.state.stateNew){
            this.singup()
        }else{
            this.singIn()
        }
    }

    singup = async () => {
        try{
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
            
            showSuccess( 'Usuário cadastrado!')
            this.setState({...initialState})
        }catch(e){
            showError(e)
            console.log({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
        }
    }

    singIn = async () => {
        try{
          const res =  await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })
            axios.defaults.headers.common['Authorization'] = `bearer ${res.token}`
        }catch(e){
            showError(e)
        }
        this.props.navigation.navigate('TasksList')
    }

    render() {
        return (
            <ImageBackground 
            source={backgroundImage} 
            style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>{this.state.stateNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>
                    {this.state.stateNew &&
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name} style={[commonStyles.input, styles.input]}
                    onChangeText={name => this.setState({name}) }></AuthInput>
                    }
                    <AuthInput icon='at' placeholder='E-mail' value={this.state.email} style={[commonStyles.input, styles.input]}
                    onChangeText={email => this.setState({email}) }></AuthInput>
                    <AuthInput icon='lock' placeholder='Senha' value={this.state.password} style={[commonStyles.input, styles.input]}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({password}) }></AuthInput>
                    {this.state.stateNew &&
                       <AuthInput icon='asterisk' placeholder='Confirmar Senha' value={this.state.confirmPassword} style={[commonStyles.input, styles.input]}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}></AuthInput>
                    }
                    <TouchableOpacity onPress={this.signinOrSingup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{this.state.stateNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity style={{padding: 10}} onPress={() => this.setState({stateNew: !this.state.stateNew})}>
                    <Text style={{color: '#FFF'}}>
                        {this.state.stateNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary ,
        fontSize: 50,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 20,
        width: '90%'
    },
    input: {
    
        padding: Platform.OS == 'ios' ? 15 : 10,
    
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 20
   },
   buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20
   }
})
