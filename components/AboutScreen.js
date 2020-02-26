import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import base64 from 'react-native-base64'
import { Button, View, Text, TextInput,
    StyleSheet,
    Image,
    SafeAreaView,
    Alert, AsyncStorage, 
    TouchableOpacity
  } from 'react-native';

import Dialog from "react-native-dialog";
import enviarData from '../until/registro';

let url = 'http://192.168.100.38:4000/contenido';

const imagen = ("data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==")
export default class Registro extends Component {
    constructor(props){
        super(props)
        this.state = {
          imagen1: 'hola',
          idUsuario: false,
          nombreUsuario: false,
          nombreproducto: '',
          empresa: '',
          descripcion: '',
          ciudad: '',
          precio: '',
          dialogVisible: false,
          image: null,
        }
    
        this.nombreproducto=this.nombreproducto.bind(this)
        this.empresa=this.empresa.bind(this)
        this.descripcion=this.descripcion.bind(this)
        this.ciudad = this.ciudad.bind(this)
        this.precio = this.precio.bind(this)
        this._retrieveData=this._retrieveData.bind(this)
        this._handleImagePicked=this._handleImagePicked.bind(this)
        
      }
      
      
      nombreproducto(event){
        this.setState({nombreproducto: String(event)})
      }
      empresa(event){
        this.setState({empresa: String(event)})
      }
      descripcion(event){
        this.setState({descripcion: String(event)})
      }
      ciudad(event){
        this.setState({ciudad: String(event)})
      }
      precio(event){
        this.setState({precio: String(event)})
      }
      // imagen=async(files)=>{
    
      //   const datos = JSON.stringify(files)
        
      //   const miar = datos.split('base64":"')
      //   console.log(miar)
      //   const last = String(miar[1])
      //   const pen = last.split('","file":{}}]')
      //   console.log(String(pen[0]))
      //   await this.setState({ imagen1: String(pen[0]) })
        
      // }
      envio=async()=>{
        const data = JSON.stringify({
          idusuario: this.state.idUsuario,
          idimagen: this.state.imagen1,
          nombreproducto: this.state.nombreproducto,
          empresa: this.state.empresa,
          descripcion: await this.state.descripcion,
          ciudad: this.state.ciudad,
          precio: this.state.precio
    
          
        })
        try{
          const response = await fetch(url,{
            method: 'POST',
            body: data,
            headers:{
              'Content-type': 'application/json'
            }
          })
          if (response.ok){
            alert(`Tu publicacion ${this.state.nombreproducto} ha sido creada con éxito`)
            this.dialogActivador()
            this.props.navigation.navigate('Home')
          }
        }catch{
         
        }
      }

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

    _retrieveData = async () => {
      try {
        const miid = await AsyncStorage.getItem('id');
        const user = await AsyncStorage.getItem('user');
        
        if (miid !== null) {
          // We have data!!
           this.setState({
            nombreUsuario: user,
            idUsuario: miid,
            // nombreUsuario: String(user),
          })
          console.log(this.state.idUsuario,this.state.nombreUsuario)
        }
      } catch (error) {
        // Error retrieving data
      }
      
    };

    componentDidMount(){
      this._retrieveData()
    }
mostrardatos(){
  console.log(this.state.nombreUsuario,this.state.idUsuario)
}

  
    _pickImage = async () => {
      const { status: cameraRollPerm } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
  
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
        });
  
        this._handleImagePicked(pickerResult);
      }
    };
  
    _handleImagePicked = async pickerResult => {
      this.setState({
        imagen1: `data:image/jpeg;base64,${pickerResult.base64}`
      })
      console.log(pickerResult.base64);
    };

  render() {
  
    let { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View >

<View style={{ 'marginTop': 20}}>
  <Button
    title="Select image"
    onPress={this._pickImage}
  />

</View>
</View>
<Image
          style={{width: 200, height: 200}}
          source={{uri: `${this.state.imagen1}`}}
        />
          <Text>Titulo</Text>
         <TextInput
      
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(x) => {this.nombreproducto(String(x))}}
      value={this.state.nombreproducto}
    />
    <Text>Empresa</Text>
     <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.empresa(String(contra))}}
      value={this.state.empresa}
    />
    <Text>Descripcion</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.descripcion(String(contra))}}
      value={this.state.descripcion}
    />
    <Text>Ciudad</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.ciudad(String(contra))}}
      value={this.state.ciudad}
    />
    <Text>Precio</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(contra) => {this.precio(String(contra))}}
      value={this.state.precio}
    />

     <Button
          title="EnviarDatos"
          color="#f194ff"
          onPress={() =>this.dialogActivador()}
        />

        
        <Dialog.Container visible={this.state.dialogVisible}>
    <Dialog.Title>{`Estas a punto de encrear ${this.state.nombreproducto}`}</Dialog.Title>
   
          <Dialog.Button label="Cancel" onPress={()=>this.dialogActivador()} />
          <Dialog.Button label="Delete" onPress={()=>this.envio()} />
        </Dialog.Container>
      </View>
      
    )
  }
}