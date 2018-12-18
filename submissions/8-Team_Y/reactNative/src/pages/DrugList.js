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

class DrugList extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      securityPin: '',
      authenticating: false,
    }
  }

  scanresult = () => {
    Actions.scanresult()
  }

  scanresultexpired = () => {
    Actions.scanresultexpired()
  }

  scanresultrecall = () => {
    Actions.scanresultrecall()
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
          <View style={styles.topCont}>
            <TouchableOpacity onPress={() => this.scanresult()} style={styles.button}>
              <Text style={styles.buttonText}>Clarinase Tablet 120mg</Text>
            </TouchableOpacity>
          </View>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
          <View style={styles.topCont}>
            <TouchableOpacity onPress={() => this.scanresultexpired()} style={styles.button}>
              <Text style={styles.buttonText}>Stenac Tablet 600mg</Text>
            </TouchableOpacity>
          </View>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
          <View style={styles.topCont}>
            <TouchableOpacity onPress={() => this.scanresultrecall()} style={styles.button}>
              <Text style={styles.buttonText}>Tussidex Forte Linctus</Text>
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
    backgroundColor: '#ffffff',
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
    color: "#000000"
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

export default DrugList
