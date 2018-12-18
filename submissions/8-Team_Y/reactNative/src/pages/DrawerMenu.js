import React , { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, List, ListItem } from 'native-base';

class DrawerMenu extends Component<{}> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Content>
          <View style={{height: 20}}></View>
          <List>
            <ListItem onPress={() => Actions.login()}>
              <Text>Main Menu</Text>
            </ListItem>
            <ListItem onPress={() => Actions.cameracomponent()}>
              <Text>Scan</Text>
            </ListItem>
            <ListItem onPress={() => Actions.druglist()}>
              <Text>My Drug List</Text>
            </ListItem>
            <ListItem onPress={() => Actions.login()}>
              <Text>Notice</Text>
            </ListItem>
          </List>
        </Content>
      </View>
    )
  }
}

export default DrawerMenu
