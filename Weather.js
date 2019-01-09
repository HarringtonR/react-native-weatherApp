import React from "react";
import { StyleSheet, View, Image, ImageBackground, Dimensions } from "react-native";
import { Text } from 'react-native-elements';
import { Location, Permissions } from 'expo';
import Config from './Config.js';
import { createBottomTabNavigator } from 'react-navigation';
import moment from 'moment';

class Weather extends React.Component {
   state = {
     weather: '',
     errorMessage: ''
   }

  componentDidMount() {
    const API_KEY = Config.WEATHER_API_KEY;
    getLocationAsync = async () => {
      let {
        status
      } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
      let location = await Location.getCurrentPositionAsync({});
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=imperial&APPID=${API_KEY}`)
      let data = await response.json()
      console.log(data)
            this.setState({
              weather: data
            })
    }
    getLocationAsync()
  }


  render() {
       let weather;
       if (this.state.weather !== '') {
         sunrise = new Date(1000 * this.state.weather.sys.sunrise);
         sunset = new Date(1000 * this.state.weather.sys.sunset);
         let sunriseMoment = moment(sunrise).format('h:mm')
         let sunsetMoment = moment(sunset).format('h:mm')
        console.log(this.state.weather)
         weather = <View style={styles.container}>
             <Text h1>{this.state.weather.name}</Text>
                <Image style={styles.imageStyle} source={{ uri: `http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png` }} />
             <Text h3>
               Current: {Math.round(this.state.weather.main.temp)}˚
             </Text>
             <Text h4>
               High: {Math.round(this.state.weather.main.temp_max)}˚
             </Text>
             <Text h4>
               Low: {Math.round(this.state.weather.main.temp_min)}˚
             </Text>
           <Text h4>Humidity: {this.state.weather.main.humidity}%</Text>
           <Text h4>Wind Speed: {Math.round(this.state.weather.wind.speed)}mph</Text>


           </View>;
       }
    return (
     <View style = {styles.container} >
      <ImageBackground style={styles.background} source={require('./assets/FuSf4JD.jpg')}>
          {weather}
      </ImageBackground>
      </View>
    );
  }
}

class FiveDay extends React.Component {
  state = {
    weather: '',
    errorMessage: ''
  }

  componentDidMount() {
    const API_KEY = Config.WEATHER_API_KEY;
    getLocationAsync = async () => {
      let {
        status
      } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
      let location = await Location.getCurrentPositionAsync({});
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=imperial&APPID=${API_KEY}`)
      let fiveDayData = await response.json()
      this.setState({
         weather: fiveDayData
       })
      console.log(this.state.weather);
    }
    getLocationAsync()
  }

  render() {
    let weather;

    if (this.state.weather !== ''){

      weather = this.state.weather.list.map((day, i) => {
        let date = day.dt_txt.slice(0, 10)
        let dayOfWeek = moment(date).format("dddd")
        if (this.state.weather.list.indexOf(day) % 8 === 0 ){
        return <View key= {i} style = {styles.dayContainerStyle}>
          <Text h4>{dayOfWeek}</Text>
          <Image style={styles.imagesStyle} source={{ uri: `http://openweathermap.org/img/w/${day.weather[0].icon}.png` }} />
          <Text>
            Average: {Math.round(day.main.temp)}˚
             </Text>
          <Text>
            High: {Math.round(day.main.temp_max)}˚
             </Text>
          <Text>
            Low: {Math.round(day.main.temp_min)}˚
             </Text>
             </View >
      }})
    }
    return <View style={styles.container}>
        <ImageBackground style={styles.background} source={require("./assets/FuSf4JD.jpg")}>
          <View style={styles.wrapStyle}>{weather}</View>
        </ImageBackground>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 30
  },
  wrapStyle: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 35
  },
  dayContainerStyle: {
    width: 150,
    height: 100,
    textAlign: "center",
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle: {
    height: 75,
    width: 75
  },
  imagesStyle: {
    height: 40,
    width: 60
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center"
  }
});

export default createBottomTabNavigator(
  {
    "Today's Forecast": Weather,
    "5 Day Forecast": FiveDay
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "lightgray",
      labelStyle:{
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 13,
        marginBottom: 15,
      },
      style: {
        backgroundColor: "#2dadb1",
        borderColor: "#ffb6c1",
        borderWidth: 0
      }
    },

  }
);
