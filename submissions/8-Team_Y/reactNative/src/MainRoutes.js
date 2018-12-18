import React , { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import First from './pages/First';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourth';
import Login from './pages/Login';
import CameraComponent from './pages/CameraComponent';
import CameraComponentExpired from './pages/CameraComponentExpired';
import ScanResult from './pages/ScanResult';
import ScanResultExpired from './pages/ScanResultExpired';
import ScanResultRecall from './pages/ScanResultRecall';
import DrugList from './pages/DrugList';

import DrawerMenu from './pages/DrawerMenu';
class Routes extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="drawer" drawer contentComponent={DrawerMenu} drawerWidth={200} initial={true} hideNavBar>
            <Scene key="login" component={Login} title="DrugSafe"/>
            <Scene key="druglist" component={DrugList} title="My Drug List"/>
            <Scene key="scanresultexpired" component={ScanResultExpired} title="Scan Result"/>
            <Scene key="scanresultrecall" component={ScanResultRecall} title="Recall Item"/>
            <Scene key="scanresult" component={ScanResult} title="Scan Result"/>
            <Scene key="cameracomponent" component={CameraComponent} title="Scan"/>
            <Scene key="cameracomponentexpired" component={CameraComponentExpired} title="Scan"/>
            <Scene key="first" component={First} title="My List of Drugs"/>
            <Scene key="second" component={Second} title="Notice"/>
          </Scene>
        </Stack>
      </Router>
    )
  }
}

export default Routes
