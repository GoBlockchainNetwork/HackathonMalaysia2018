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
  Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Camera, Permissions } from 'expo';
import * as firebase from 'firebase'

class CameraComponent extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      refresh: false,
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  scanResult = () => {
    this.setState({ refresh: true });
    setTimeout(function(){Actions.scanresult()}, 1500);
  }

  login = () => {
    Actions.login()
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.refresh == true) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>);
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 0.8 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
              </TouchableOpacity>
            </View>
          </Camera>
          <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this.scanResult()} style={styles.button}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this.login()} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#9ccc65',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: 50,
    width: 300,
    backgroundColor: 'rgba(100, 100, 100, 0.7)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginVertical: 10
  },
  button: {
    padding: 10,
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
  },
  topCont: {
    flexGrow: 1,
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

export default CameraComponent
