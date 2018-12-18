import React , { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, YellowBox } from 'react-native';
import MainRoutes from './src/MainRoutes';
import * as firebase from 'firebase';
import firebaseAPI from './constants/firebaseAPI';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import Expo from 'expo';

async function getToken() {
  // Remote notifications do not work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  let value = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our token', value);
  /// Send this to a server
}
export default class App extends Component {

  componentDidMount() {
    getToken();
    this.listener = Expo.Notifications.addListener(this.handleNotification);
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  handleNotification = ({ origin, data }) => {
    setTimeout(function(){ Actions.scanresultrecall() }, 3000);

  };
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
    // initialize firebase
    if (!firebase.apps.length) { firebase.initializeApp(firebaseAPI.config)}
    const db = firebase.database().ref('testing')
    let initialize = true
    db.on('value', function(snapshot) {
      const localNotification = 'test'
      if (initialize == false) {
        Expo.Notifications.presentLocalNotificationAsync(localNotification)
      } else {
        initialize = false
      }
    });

    global.timestamp = (new Date() / 1000).toFixed(0) //1540726946
    console.log(timestamp)
    global.gotData = false
    global.data = {}
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay}/>}
        <MainRoutes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
