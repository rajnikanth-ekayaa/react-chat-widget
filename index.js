import Widget from './src';
import {
	addUserMessage,
	addResponseMessage,
	addLinkSnippet,
	renderCustomComponent,
	toggleWidget,
	toggleInputDisabled,
	toggleMsgLoader,
	dropMessages,
	isWidgetOpened,
	setQuickButtons,
	deleteMessages,
	markAllAsRead,
	setBadgeCount,
} from './src/store/dispatcher';

const ChatWidget = {
	Widget,
	addUserMessage,
	addResponseMessage,
	addLinkSnippet,
	renderCustomComponent,
	toggleWidget,
	toggleInputDisabled,
	toggleMsgLoader,
	dropMessages,
	isWidgetOpened,
	setQuickButtons,
	deleteMessages,
	markAllAsRead,
	setBadgeCount,
};

export default ChatWidget;
