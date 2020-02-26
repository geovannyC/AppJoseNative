import React, { Component } from 'react'
import { Button, View, Text, TextInput,
    StyleSheet,
    
    SafeAreaView,
    Alert, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Dialog from "react-native-dialog";
import getData from '../until/login'
export default class Contactscreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: false,
            contra: false,
            usuario: null,
            correo: null,
            dialogVisible: false
        }
        this.emailInput = this.emailInput.bind(this)
        this.contraInput = this.contraInput.bind(this)
        this.dialogActivador = this.dialogActivador.bind(this)
    }
    emailInput=async(event)=>{
         this.setState({
             email: event
         })
    }
    contraInput(event){
        this.setState({
            contra: event
        })
    }

    setLocal=async(x,y)=>{
        await getData(x,y).then((data)=>{
            if(data === 'usuario incorrecto'){
                this.dialogActivador()
                this.alertInicioSessionTitulo(false)
            }else{
            this.setState({
                usuario: data[0]['nombre'],
                correo: data[0].correo
            })
            console.log(data[0].id)
            AsyncStorage.setItem('id', String(data[0].id));
            AsyncStorage.setItem('user', String(data[0]['nombre']));    
            // window.location.href='http://localhost:3000'
            this.props.navigation.navigate('Home')
               
        }  
        })
        
        
      };
    dialogActivador(){
        if(this.state.dialogVisible){
            return this.setState({
                dialogVisible: false
            })
        }else{
            return this.setState({
                dialogVisible: true
            })
        }

    }
    alertInicioSessionTitulo(x){
        if(x){
            return `Bienvenido ${this.state.usuario}`
        }else{
            return `Usuario o Contraseña incorrectos`
        }
    }
 

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(email) => {this.emailInput(String(email))}}
      value={this.state.email}
    />
     <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.contraInput(String(contra))}}
      value={this.state.contra}
    />
     <Button
          title="Ingresar"
          color="#f194ff"
          onPress={() =>this.setLocal(this.state.email,this.state.contra)}
        />
    
        <Dialog.Container visible={this.state.dialogVisible}>
    <Dialog.Title>{this.alertInicioSessionTitulo()}</Dialog.Title>
        
          <Dialog.Button label="Cancel" onPress={()=>this.dialogActivador()} />
          <Dialog.Button label="Delete" onPress={()=>this.dialogActivador()} />
        </Dialog.Container>
      </View>
      
    )
  }
}