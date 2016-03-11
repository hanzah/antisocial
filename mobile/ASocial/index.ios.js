/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  DeviceEventEmitter,
  NavigatorIOS
} from 'react-native';

var Beacons = require('react-native-ibeacon');

var Home = require('./views/home');
var BeaconListView = require('./views/beacon_list_view');
var settings = require('./settings.js');

Beacons.requestAlwaysAuthorization();

Beacons.startMonitoringForRegion(settings.region);
Beacons.startUpdatingLocation();

class ASocial extends Component {
  constructor(props) {
    super(props);
    this.state = {inRegion: true};
  }
  componentDidMount(){
    DeviceEventEmitter.addListener(
      'regionDidEnter', (data) => {
        this.setState({inRegion: true});
      });
    DeviceEventEmitter.addListener(
      'regionDidExit', (data) => {
        this.setState({inRegion: false});
      });
  }
  render() {
    var view = <Home />
    if(this.state.inRegion){
      view = (<NavigatorIOS
                style={styles.container}
                initialRoute={{
                  component: BeaconListView,
                  title: 'Beacons'
                }} />)
    }
    return (
      view
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('ASocial', () => ASocial);
