'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Component,
	View,
	Text,
	ListView,
	DeviceEventEmitter,
	ActivityIndicatorIOS,
	TouchableHighlight
} = React;

var settings = require('../settings.js');
var Beacons = require('react-native-ibeacon');
var beaconService = require('../services/beacon_service.js');

var ChatRoom = require('./chat_room.js');


class BeaconListView extends Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1.id != r2.id
		});
		this.state = {dataSource: ds.cloneWithRows([]), showProgress: true};
		this.beaconArray = [];
	}
	componentDidMount(){
		//this.fetchBeacon(settings.dummyBeacon)
		Beacons.startRangingBeaconsInRegion(settings.region);
    	DeviceEventEmitter.addListener(
      		'beaconsDidRange', (data) => {
      			this.beaconArray = [];
        		for(var beacon of data.beacons){
        			this.fetchBeacon(beacon);
        		}
      		});
  	}
  	componentWillUnmount(){
    	this.beaconArray = [];
  	}
	renderRow(rowData){
		return(
			<TouchableHighlight
				onPress={()=> this.rowSelected(rowData)}
				underlayColor='#ddd'>
				<View style={styles.row}>
					<Text>{rowData.name}</Text>
				</View>
			</TouchableHighlight>
		)
	}
	rowSelected(rowData){
		this.beaconArray = [];
		this.setState({dataSource: this.state.dataSource.cloneWithRows(this.beaconArray)});
		this.props.navigator.push({
			title: 'Chat',
			component: ChatRoom,
			passProps: {
				beacon: rowData
			}
		})
	}
	fetchBeacon(beacon){
		beaconService.get(beacon, (error, data) => {
			if(!error){
				this.beaconArray.push(data);
				this.setState({dataSource: this.state.dataSource.cloneWithRows(this.beaconArray), showProgress: false});
			}else{
				console.log(error);
			}
		});
	}
	render(){
		if(this.state.showProgress){
			return(
				<View style={styles.loader}>
					<ActivityIndicatorIOS
						size='large'
						animating={true} />
				</View>
			);
		}
		return(
			<View style={styles.container}>
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {this.renderRow.bind(this)} />
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#EDEB79',
		paddingTop: 60
	},
	loader:{
		flex: 1,
		justifyContent: 'center'
	},
	row:{
		alignSelf: 'stretch',
		alignItems: 'center',
		padding: 20,
		marginLeft: 15,
		borderBottomWidth: 0.5,
		borderColor: '#2D3336'
	}
});

module.exports = BeaconListView;