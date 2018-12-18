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
  ScrollView,
  Alert,
  Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import InputOneRow from '../components/InputOneRow';
import InputTitle from '../components/InputTitle';
import InputPicker from '../components/InputPicker';
import InputTime from '../components/InputTime';
import Moment from 'react-moment';
import 'moment-timezone';
import * as firebase from 'firebase'

class ScanResultExpired extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      time: global.timestamp,
      weather: '',
      type: '',
      remark: '',
      refresh: false,
    }
  }

  scanAgain() {
    Actions.cameracomponent()
  }

  login = () => {
    Actions.login()
  }

  componentDidMount() {

  }

  renderCurrentState() {
    return (
      <KeyboardAvoidingView behavior="padding">
        {/*Current Liabilities Section*/}
        <View style={{alignItems: 'center',}}>
          <Image
            style={{width: 200, height: 200}}
            source={require('../img/Expired.png')}
          />
        </View>
        <Text style={styles.titleMiddleText}>
          Drug has expired{'\n'}
          Do not use!
        </Text>
        <InputTitle title1='Drug Info:'/>
        <InputTitle title1='Name:' title2='Stenac Tablet 600mg'/>
        <InputTitle title1='Manufacturer:' title2='Synmosa Biopharma Corporation'/>
        <InputTitle title1='Batch No:' title2='B26881'/>
        <InputTitle title1='Expiry Date:' title2='23-08-2018' type='red'/>
        <InputTitle title1='Manufacture Date:' title2='23-08-2017'/>
        <InputTitle title1='Contents:' title2='Acetylcysteine'/>
        <InputTitle title1='Usage:' title2='Mucus thinning, Paracetamol overdose, Prevention of radiocontrast-induced nephropathy'/>
        <InputTitle title1='Side Effects:' title2='Rash, Urticaria, Pruritus, Hypotension, Wheezing, Shortness of breath, Nausea, Vomiting, Stomatitis, Fever, Rhinorrhea, Drowsiness, Clamminess, Chest tightness, Bronchoconstriction '/>
        <TouchableOpacity onPress={() => this.scanAgain()} style={styles.button}>
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this.login()} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <View style={{height: 20}}></View>
      </KeyboardAvoidingView>
    )
  }
  render() {
    return (
      <ScrollView style={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        {this.renderCurrentState()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    textAlign: 'center',
  },
  inputText: {
    padding: 5,
    height: 50,
    width: 100,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 5
  },
  titleText: {
    padding: 5,
    width: 150,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 5
  },
  titleMiddleText: {
    padding: 5,
    paddingHorizontal: 5,
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 5
  },
  inputBox: {
    height: 50,
    width: 150,
    backgroundColor: 'rgba(100, 100, 100, 0.7)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginVertical: 5
  },
  button: {
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  }
});

export default ScanResultExpired
