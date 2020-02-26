
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet,  ScrollView } from 'react-native';
import getData from '../until/publicacionesGet'
import { ListItem } from 'react-native-elements'
import { Container } from 'native-base';
export default class Homescreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      loading: true,
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
     
          <ListItem key={i}
          leftAvatar={{ source: {uri:l.idimagen}}}
          
          title={l.nombreproducto}
          subtitle={l.descripcion}
          rightSubtitle={l.precio}
          rightTitle={l.ciudad}
          bottomDivider
        ></ListItem>
        
        )
      
     
    } )}
          
      </View>
      </ScrollView>
    
    </Container>
   
    )
  }
}
}