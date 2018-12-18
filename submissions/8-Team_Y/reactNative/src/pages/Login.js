import React , { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase'
import Expo from 'expo';

class Login extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      securityPin: '',
      authenticating: false,
    }
  }

  register = () => {
    if (this.state.securityPin == 900828) {
      Actions.register()
    } else {
      Alert.alert('Wrong security pin, please get it from developer.')
    }
  }

  forgetPassword = () => {
    Actions.forgetPassword()
  }

  cameracomponent = () => {
    Actions.cameracomponent()
  }

  druglist = () => {
    Actions.druglist()
  }

  login = () => {
    Actions.receipt()
  }

  // if authenticating, show the circle, else show the main menu
  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      return (
        <KeyboardAvoidingView behavior="padding">
          <View style={{alignItems: 'center',}}>
            <Image
              style={{width: 200, height: 200}}
              source={require('../img/output-onlinepngtools.png')}
            />
          </View>
          <View style={{height: 50}}></View>
          <View style={styles.topCont}>
            <TouchableOpacity onPress={() => this.cameracomponent()} style={styles.button}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topCont}>
            <TouchableOpacity onPress={() => this.druglist()} style={styles.button}>
              <Text style={styles.buttonText}>My Drug List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topCont}>
            <TouchableOpacity onPress={() => this.notice()} style={styles.button}>
              <Text style={styles.buttonText}>Notice</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        {this.renderCurrentState()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: 50,
    width: 300,
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginVertical: 10
  },
  button: {
    padding: 10,
    width: 300,
    backgroundColor: '#233ec6',
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#ffffff"
  },
  topCont: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bottomTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  bottomText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 16
  },
  bottomButton: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500'
  }
});

export default Login
