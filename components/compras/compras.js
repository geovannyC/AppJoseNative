
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet,  ScrollView, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Container } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import getData from '../../until/listacompras'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
export default class Compras extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      loading: true,
    }
  }
//   _retrieveData = async () => {
//     try {
//       const user = await AsyncStorage.getItem('user');
//       const id = await AsyncStorage.getItem('id')
//       const correo = await AsyncStorage.getItem('correo')
//       if (user !== null) {
//         // We have data!!
//          this.setState({
//           usuarioActual: user,
//           correo: correo,
//           // nombreUsuario: String(user),
//         })
//         console.log(user,correo)
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
    
//   };
  componentDidMount=async()=> {
    getData(await AsyncStorage.getItem('id')).then((data) => {
      if(data===null||data===[]){
        return null
      }else{
      this.setState({
        data: data,
        loading: false,
      })
    } 
    });

 }
render() {
    if(this.state.loading){
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>CARGANDO</Text>
      </View>
    }else{
      try{
        return (
          <Container>
          <ScrollView>
            
          <View >
          {
        this.state.data.map((l, i) =>{
          
            return(
         
            <Card>
            <CardTitle
            title={l.nombreproducto}
              subtitle={`Nombre: ${l.nombrevendedor} ${l.apellidovendedor}`}
            />
            <CardContent text={`Correo: ${l.emailvendedor}`}/>
            <CardContent text={`Telefono:  ${l.telefonovendedor}`}/>
            <CardContent text={`Fecha Venta: ${l.fechacompra}`}/>
             <CardContent text={`Precii:  ${l.precio}`}/>
    
            <CardAction 
              separator={true} 
              inColumn={false}>
         
            </CardAction>
          </Card>
            )
          
         
        } )}
              
          </View>
          </ScrollView>
        
        </Container>
       
        )
      }catch{return <Text>No haz realizado ninguna compra</Text>}

  }
}
}