import React, { Component } from 'react';

import ChatWidget from '../index';

export default class App extends Component {
	componentDidMount() {
		ChatWidget.addResponseMessage('Welcome to this awesome chat!');
		ChatWidget.addLinkSnippet({ link: 'https://google.com', title: 'Google' });
		ChatWidget.addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
		ChatWidget.addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
	}

	handleNewUserMessage = (newMessage: any) => {
		ChatWidget.toggleMsgLoader();
		setTimeout(() => {
			ChatWidget.toggleMsgLoader();
			if (newMessage === 'fruits') {
				ChatWidget.setQuickList(
					
					{
						list:[
							{ label: 'Apple', value: 'apple' },
							{ label: 'Orange', value: 'orange' },
							{ label: 'Pear', value: 'pear' },
							{ label: 'Banana', value: 'banana' },
							],
							config:{type:"multiple"}
					}
						);
			} else {
				ChatWidget.addResponseMessage(newMessage);
			}
		}, 2000);
	};

	handleQuickButtonClicked = (e: any) => {
		ChatWidget.addResponseMessage('Selected ' + e);
		//ChatWidget.setQuickButtons([]);
		ChatWidget.setQuickList({list:[],config:{type:"single"}});
	};

	handleQuickListSubmitButtonClicked = (e: any) => {
		ChatWidget.addResponseMessage('Selected ' + e);
		//ChatWidget.setQuickButtons([]);
		ChatWidget.setQuickList({list:[],config:{type:"single"} });
	};

	handleAttachButtonClicked = (e: any) => {
		ChatWidget.addResponseMessage('Attached');
	};

	handleSubmit = (msgText: string) => {
		if (msgText.length < 80) {
			ChatWidget.addUserMessage('Uh oh, please write a bit more.');
			return false;
		}
		return true;
	};

	handleSwitchUser = (userID: string) => {
		ChatWidget.switchUser(userID);
	};

	render() {
		return (
			<>
				<ChatWidget.Widget
					title='Bienvenido'
					subtitle='Asistente virtual'
					senderPlaceHolder='Escribe aquí ...'
					handleNewUserMessage={this.handleNewUserMessage}
					handleQuickButtonClicked={this.handleQuickButtonClicked}
					handleQuickListSubmitButtonClick={this.handleQuickListSubmitButtonClicked}
					handleAttachButtonClicked={this.handleAttachButtonClicked}
					imagePreview
					handleSubmit={this.handleSubmit}
					emojis={true}
					widget={false}
				/>
				<button onClick={this.handleSwitchUser.bind(this, 'rajnikanth.leo@gmail.com')}>Switch To Raj</button>
				<button onClick={this.handleSwitchUser.bind(this, 'admin')}>Switch To Admin</button>
			</>
		);
	}
}
