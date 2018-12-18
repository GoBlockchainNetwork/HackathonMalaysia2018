import React , { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

const width1 = '35%';
const width2 = '65%';

class InputTitle extends Component<{}> {

  render() {
    let title2view
    if(this.props.type == 'red') {
      title2view = <Text style={styles.redTitleText}>
        {this.props.title2}
      </Text>
    } else {
      title2view = <Text style={styles.titleText}>
        {this.props.title2}
      </Text>
    }
    return (
      <View style={{flexDirection:'row'}}>
        <Text style={styles.inputText}>
          {this.props.title1}
        </Text>
        {title2view}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputText: {
    padding: 5,
    width: width1,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 5,
    alignSelf:'baseline',
    fontWeight: '500',
  },
  titleText: {
    padding: 5,
    width: width2,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 5
  },
  redTitleText: {
    padding: 5,
    width: width2,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginVertical: 5
  }
});

export default InputTitle
