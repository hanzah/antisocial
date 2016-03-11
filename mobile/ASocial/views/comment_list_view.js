'use strict';

var React = require('react-native');
var moment = require('moment');

var {
	StyleSheet,
	Component,
	View,
	Text,
	ListView
} = React;

class CommentListView extends Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1.id != r2.id
		});
		this.state = {dataSource: ds.cloneWithRows(this.props.comments)};
	}
	componentWillReceiveProps(nextProps){
  		this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.comments)});
	}
	renderRow(rowData){
		return(
			<View style={styles.row}>
				<Text style={styles.date}>{moment(rowData.created_at).fromNow()}</Text>
				<Text style={styles.text}>{rowData.text}</Text>
			</View>
		)
	}
	render(){
		return(
				<ListView style={styles.container}
					dataSource = {this.state.dataSource}
					renderRow = {this.renderRow.bind(this)} />
		);
	}
}

var styles = StyleSheet.create({
	container:{
		backgroundColor: '#EDEB79',
		flex: 1
	},
	row:{
		alignSelf: 'stretch',
		marginLeft: 15,
		borderBottomWidth: 0.5,
		borderColor: '#2D3336',
	},
	text:{
		padding: 10,
		alignSelf: 'flex-start',
		fontSize: 12
	},
	date:{
		alignSelf: 'flex-start',
		fontSize: 8
	}
});

module.exports = CommentListView;