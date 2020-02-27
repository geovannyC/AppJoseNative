
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet,  ScrollView, AsyncStorage } from 'react-native';
import getData from '../until/publicacionesGet'
import { ListItem, Tile } from 'react-native-elements'
import { Container } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import envio from '../until/comprarPlatillo';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class Homescreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      loading: true,
      nombreproducto: null,
      precio: null,
      isDialogVisible: false,
      usuarioActual: false,
      correo: false,
    }
  }
  componentDidMount=async()=> {
    getData().then((data) => {
      this.setState({
        data: data,
        loading: false,
      })  
    });

 }
 _retrieveData = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const correo = await AsyncStorage.getItem('correo')
    if (user !== null) {
      // We have data!!
       this.setState({
        usuarioActual: user,
        correo: correo,
        // nombreUsuario: String(user),
      })
      console.log(user,correo)
    }
  } catch (error) {
    // Error retrieving data
  }
  
};
 activar=async(nombreproducto,precio)=>{
  await this.setState({
   isDialogVisible: true,
    nombreproducto: nombreproducto,
    precio: precio
  })
  this._retrieveData()
  console.log(this.state.nombreproducto)
  console.log(this.state.precio)
}
contenido(){
  return (`Vas ha comprar el platillo ${this.state.nombreproducto} con el prescio ${this.state.precio}`)
}
desactivar(){
  this.setState({
    isDialogVisible: false
  })
}
sendInput(x,y,a,s){
 
  envio(x,y,a,s)
  this.desactivar()
}
  render() {
    if(this.state.loading){
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>CARGANDO</Text>
      </View>
    }else{
    return (
      <Container>
      <ScrollView>
        
      <View >
      {
    this.state.data.map((l, i) =>{
      
        return(
     
        //   <ListItem key={i}
        //   leftAvatar={{ source: {uri:l.idimagen}}}
          
        //   title={l.nombreproducto}
        //   subtitle={l.descripcion}
        //   rightSubtitle={l.precio}
        //   rightTitle={l.ciudad}
        //   button onPress={() => this.activar(l.nombreproducto, l.precio)}
        //   bottomDivider
        // ></ListItem>
//         <Tile
//         key={l.id}
       
//   imageSrc={{ source:{uri:l.idimagen}}}
//   title={`${l.nombreproducto} ${l.precio}`}
//   caption={l.descripcion}
//   featured
//   activeOpacity
//   onPress={() => this.activar(l.nombreproducto, l.precio)}
// />
<Card>
<CardImage 
  source={{uri: l.idimagen}} 
  title={`${l.nombreproducto} ${l.precio}`}
  isDark={true}
/>
<CardTitle
  subtitle={l.ciudad}
  isDark={true}
/>
<CardContent text={`${l.nombreproducto} ${l.precio}`} />
<CardAction 
  separator={true} 
  isDark={true}
  inColumn={false}>
  <CardButton
    onPress={() => this.activar(l.nombreproducto, l.precio)}
    title="Comprar"
    color="#FEB557"
  />
</CardAction>
</Card>
        
        )
      
     
    } )}
       <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={this.contenido()}

            hintInput ={"5"}
            submitInput={ () => {this.sendInput(this.state.nombreproducto,this.state.precio,this.state.usuarioActual, this.state.correo)} }
            closeDialog={ () => {this.desactivar()}}>
</DialogInput>
          
      </View>
      </ScrollView>
    
    </Container>
   
    )
  }
}
}