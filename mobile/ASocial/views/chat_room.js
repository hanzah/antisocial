'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Component,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

var ActionCable = require('../lib/action_cable.js');
var CommentListView = require('./comment_list_view.js');
var commentService = require('../services/comment_service.js');
var settings = require('../settings.js');

class ChatRoom extends Component{
	constructor(props){
		super(props);
		this.state = {comments: [], showProgress: true};
	}
	onCommentButtonPressed(){
		if(this.state.commentText){
			this.setState({showProgress: true});
			this.subscription.comment(this.state.commentText)
			this.setState({commentText: ''})
		}
	}
	componentDidMount(){
		commentService.index(this.props.beacon, (error, data) => {
			if(!error){
				this.state.comments = this.state.comments.concat(data);
				this.setState({comments: this.state.comments, showProgress: false});
			}else{
				console.log(error);
			}
		});
		this.cable = ActionCable.Cable.createConsumer(settings.wsurl);
		this.subscription = this.cable.subscriptions.create({channel: 'ChatRoomChannel', auth_token: this.props.beacon.auth_token }, {
			component: this,
  			connected: function(){
  				console.log('connected');
  			},
  			disconnected: function(){
  				console.log('disconnected');
  			},
  			rejected: function(){
  				console.log('rejected');
  			},
  			received: function(data){
  				if(data && data.comment){
  					this.component.state.comments = [data.comment].concat(this.component.state.comments);
					this.component.setState({comments: this.component.state.comments});
					this.component.setState({showProgress: false});
				}
  			},
  			comment: function(text='Hmmm'){
    			return this.perform('comment', {
      				text: text
    			});
  			}
  		});
  	}
  	componentWillUnmount(){
  		this.subscription.unsubscribe();
  	}
	render(){
		var activityView = null;
		if(this.state.showProgress){
			activityView = 	<ActivityIndicatorIOS
								size='large'
								animating={true} />
		}
		return(
			<View style={styles.container}>
				<Text>{this.props.beacon.name}</Text>
				<View style={styles.commentArea}>
					<TextInput style={styles.commentInput}
						placeholder='Write your comment...' 
						onChangeText={(text) => this.setState({commentText: text})}
						value={this.state.commentText}
						multiline={true} />
					<TouchableHighlight style={styles.commentButton}
						onPress={this.onCommentButtonPressed.bind(this)}>
						<Text style={styles.commentButtonText}>
							Comment
						</Text>
					</TouchableHighlight>
				</View>
				{activityView}
				<View style={styles.commentsList}>
					<CommentListView comments={this.state.comments} />
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#EDEB79',
		paddingTop: 70,
		alignItems: 'center'
	},
	heading: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10
	},
	commentArea: {
		flexDirection: 'column',
		alignSelf: 'stretch'
	},
	commentInput: {
		height: 100,
		fontSize: 12,
		borderWidth: 1,
		borderColor: '#2D3336',
		padding: 10
	},
	commentButton: {
		flex: 1,
		height: 40,
		backgroundColor: '#84DB32',
		alignSelf: 'flex-end',
		justifyContent: 'center',
		margin: 5,
		borderRadius: 10
	},
	commentButtonText: {
		fontSize: 12,
		alignSelf: 'center'
	},
	commentsList: {
		alignSelf: 'stretch'
	}
});

module.exports = ChatRoom;