import React from 'react';
import { Button, ThemeProvider, Header } from 'react-native-elements';
export default class Cabecera extends React.Component {
    constructor(props){
      super(props)
      this.state={
        usuario: false,
        id: false,
      }
    
    }

      // _retrieveData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('user');
    //       if (value !== null) {
    //         this.setState({
    //             usuario: AsyncStorage.getItem('user'),
    //             id: AsyncStorage.getItem('id')
    //           })
    //       console.log(value)
    //       }
    //     } catch (error) {
         
    //     }
       
    //   }

    // componentDidMount(){
    //     this._retrieveData()
    // }
 
      deleteStorage(){
        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('id')
      }
      render(){
        
          return(
            <Header
            leftComponent={{ icon: 'home', color: '#fff' }}
            centerComponent={{ text: `Bienvenido`, style: { color: '#fff' } }}
            // rightComponent={this.usuarioStorage()}
          />
          )
      }      
}