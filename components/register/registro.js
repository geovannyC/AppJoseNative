import React, { Component } from 'react'

import { Button, View, Text, TextInput,
    StyleSheet,
    
    SafeAreaView,
    Alert, AsyncStorage } from 'react-native';

import Dialog from "react-native-dialog";
import enviarData from '../../until/registro';
export default class Registro extends Component {
    constructor(props){
        super(props)
        this.state = {
            nombre: null,
            apellido: null,
            telefono: null,
            cedula: null,
            correo: null,
            contra: null,
            dialogVisible: false
        }
        this.nombre=this.nombre.bind(this)
        this.apellido=this.apellido.bind(this)
        this.correo=this.correo.bind(this)
        this.contra=this.contra.bind(this)
        this.telefono=this.telefono.bind(this)
        this.cedula=this.cedula.bind(this)
        this.dialogActivador = this.dialogActivador.bind(this)
    }
    nombre(event) {
        this.setState({nombre: String(event)});
      }
      apellido(event) {
        this.setState({apellido: String(event)});
      }
      correo(event) {
        this.setState({correo: String(event)});
      }
      contra(event) {
        this.setState({contra: String(event)});
      }
      telefono(event) {
        this.setState({telefono: String(event)});
      }
      cedula(event) {
        this.setState({cedula: String(event)});
      }

    setLocal=async()=>{
        const data = JSON.stringify({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            telefono: this.state.telefono,
            cedula: this.state.cedula,
            correo: this.state.correo,
            contra: this.state.contra,
            })
        await enviarData(data).then((data)=>{
            if(data === 'usuario incorrecto'){
                this.dialogActivador()
                this.alertInicioSessionTitulo(false)
            }else{
                this.props.navigation.navigate('Mi Perfil')
            
            // this.props.navigation.navigate('Home')
               
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
            return `Bienvenido`
        }else{
            return `El usuario ya ha sido registrado`
        }
    }
 

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Nombre</Text>
         <TextInput
        title='Nombre'
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(x) => {this.nombre(String(x))}}
      value={this.state.nombre}
    />
    <Text>Apellido</Text>
     <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.apellido(String(contra))}}
      value={this.state.apellido}
    />
    <Text>Telefono</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.telefono(String(contra))}}
      value={this.state.telefono}
    />
    <Text>Cedula</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.cedula(String(contra))}}
      value={this.state.cedula}
    />
    <Text>Correo</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.correo(String(contra))}}
      value={this.state.correo}
    />
    <Text>Contraseña</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.contra(String(contra))}}
      value={this.state.contra}
    />
     <Button
          title="Press me"
          color="#f194ff"
          onPress={() =>this.setLocal()}
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