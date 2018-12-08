import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native';

export default class Home extends React.Component {
  render() {
    setTimeout(() =>{
      this.props.navigation.navigate('Weather')
    }, 5000);
    return (
      <View style={styles.container}>
      <ImageBackground style = { styles.ImageBackground }source = {require('./assets/RtweQ8m.jpg')}>
        <Image style ={styles.Logo}  source={require ('./assets/SqhCj3g.png')}></Image>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  Logo: {
    width: 300,
    height: 230,
    alignItems: 'center'
  }
});
