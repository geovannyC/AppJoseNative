import React, { Component } from 'react';
import { Text, StyleSheet, View,AsyncStorage } from 'react-native';
import getData from '../../until/getPersonas'
import SkeletonContent from "react-native-skeleton-content-nonexpo";

export default class Perfil extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          loading: true,
          idusuario: null,
        }
      }
      componentDidMount=async()=> {
        getData(await AsyncStorage.getItem('id')).then((data) => {
          this.setState({
            data: data,
            loading: false,
          }) 
        });
    
     }
     
  render() {
    if(this.state.loading){
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
          <Text>CARGANDO</Text>
        </View>
      }else{
         
          
    
    return (
      <View style={styles.container}>
      <SkeletonContent
    containerStyle={styles.skeleton}
    isLoading={this.state.loading}
    layout={[
    { key: "title" , width: 350, height: 100, margin: 20 },
    { key: "description", width: 350, height: 200, margin: 20 },
    ]}
    >

    <Text style={styles.text}>
    Nombre: 
   {this.state.data[0].nombre}
    </Text>

    <Text style={styles.text}>
      Apellido: 
   {this.state.data[0].apellido}
    </Text>
    <Text style={styles.text}>
      Telefono: 
   {this.state.data[0].telefono}
    </Text>
    <Text style={styles.text}>
      Cédula:
   {this.state.data[0].cedula}
    </Text>
    
    <Text style={styles.text}>
    Correo: 
   {this.state.data[0].correo}
    </Text>

</SkeletonContent>
    </View>
    );
      
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skeleton:{
  flex: 1,
  width: '100%'
  },
  text: {
    fontSize: 18,
    margin: 20
  }
});

