'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Component,
	View,
	Text,
	Image
} = React;

class Home extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.heading}>Whatzaaa</Text>
				<Image style={styles.logo}
					source={require('image!logo')}/>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#EDEB79',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: 120,
		height: 120
	},
	heading: {
		fontSize: 30,
		marginTop: 10,
		marginBottom: 10
	}
});

module.exports = Home;