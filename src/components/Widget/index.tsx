import { useDispatch } from 'react-redux';

import { toggleChat, addUserMessage } from '../../store/actions';
import { isWidgetOpened } from '../../store/dispatcher';
import { AnyFunction } from '../../utils/types';

import WidgetLayout from './widget-layout';
import ChatLayout from './chat-layout';

type Props = {
	title: string;
	titleAvatar?: string;
	subtitle: string;
	senderPlaceHolder: string;
	profileAvatar?: string;
	profileClientAvatar?: string;
	showCloseButton: boolean;
	fullScreenMode: boolean;
	autofocus: boolean;
	customLauncher?: AnyFunction;
	handleNewUserMessage: AnyFunction;
	handleQuickButtonClicked?: AnyFunction;
	handleQuickListSubmitButtonClick?:AnyFunction;
	handleTextInputChange?: (event: any) => void;
	chatId: string;
	handleToggle?: AnyFunction;
	launcherOpenLabel: string;
	launcherCloseLabel: string;
	launcherOpenImg: string;
	launcherCloseImg: string;
	sendButtonAlt: string;
	showTimeStamp: boolean;
	imagePreview?: boolean;
	zoomStep?: number;
	handleSubmit?: AnyFunction;
	showBadge?: boolean;
	resizable?: boolean;
	emojis: boolean;
	widget: boolean;
	handleAttachButtonClicked?: AnyFunction;
};

function Widget({
	title,
	titleAvatar,
	subtitle,
	senderPlaceHolder,
	profileAvatar,
	profileClientAvatar,
	showCloseButton,
	fullScreenMode,
	autofocus,
	customLauncher,
	handleNewUserMessage,
	handleQuickButtonClicked,
	handleQuickListSubmitButtonClick,
	handleTextInputChange,
	chatId,
	handleToggle,
	launcherOpenLabel,
	launcherCloseLabel,
	launcherCloseImg,
	launcherOpenImg,
	sendButtonAlt,
	showTimeStamp,
	imagePreview,
	zoomStep,
	handleSubmit,
	showBadge,
	resizable,
	emojis,
	widget,
	handleAttachButtonClicked,
}: Props) {
	const dispatch = useDispatch();

	const toggleConversation = () => {
		dispatch(toggleChat());
		handleToggle ? handleToggle(isWidgetOpened()) : null;
	};

	const handleMessageSubmit = (userInput) => {
		if (!userInput.trim()) {
			return;
		}

		handleSubmit?.(userInput);
		dispatch(addUserMessage(userInput));
		handleNewUserMessage(userInput);
	};

	const onQuickButtonClicked = (event, value) => {
		event.preventDefault();
		handleQuickButtonClicked?.(value);
	};
	const onQuickListSubmitButtonClicked = (event, value) => {
		event.preventDefault();
		handleQuickListSubmitButtonClick?.(value);
	};
	

	const onAttachButtonClicked = (event, value) => {
		event.preventDefault();
		handleAttachButtonClicked?.(value);
	};

	if (widget) {
		return (
			<WidgetLayout
				onToggleConversation={toggleConversation}
				onSendMessage={handleMessageSubmit}
				onQuickButtonClicked={onQuickButtonClicked}
				onQuickListSubmitButtonClicked={onQuickListSubmitButtonClicked}
				title={title}
				titleAvatar={titleAvatar}
				subtitle={subtitle}
				senderPlaceHolder={senderPlaceHolder}
				profileAvatar={profileAvatar}
				profileClientAvatar={profileClientAvatar}
				showCloseButton={showCloseButton}
				fullScreenMode={fullScreenMode}
				autofocus={autofocus}
				customLauncher={customLauncher}
				onTextInputChange={handleTextInputChange}
				chatId={chatId}
				launcherOpenLabel={launcherOpenLabel}
				launcherCloseLabel={launcherCloseLabel}
				launcherCloseImg={launcherCloseImg}
				launcherOpenImg={launcherOpenImg}
				sendButtonAlt={sendButtonAlt}
				showTimeStamp={showTimeStamp}
				imagePreview={imagePreview}
				zoomStep={zoomStep}
				showBadge={showBadge}
				resizable={resizable}
				emojis={emojis}
			/>
		);
	} else {
		return (
			<ChatLayout
				onToggleConversation={toggleConversation}
				onSendMessage={handleMessageSubmit}
				onQuickButtonClicked={onQuickButtonClicked}
				onQuickListSubmitButtonClicked={onQuickListSubmitButtonClicked}
				title={title}
				titleAvatar={titleAvatar}
				subtitle={subtitle}
				senderPlaceHolder={senderPlaceHolder}
				profileAvatar={profileAvatar}
				profileClientAvatar={profileClientAvatar}
				showCloseButton={showCloseButton}
				fullScreenMode={fullScreenMode}
				autofocus={autofocus}
				customLauncher={customLauncher}
				onTextInputChange={handleTextInputChange}
				chatId={chatId}
				launcherOpenLabel={launcherOpenLabel}
				launcherCloseLabel={launcherCloseLabel}
				launcherCloseImg={launcherCloseImg}
				launcherOpenImg={launcherOpenImg}
				sendButtonAlt={sendButtonAlt}
				showTimeStamp={showTimeStamp}
				imagePreview={imagePreview}
				zoomStep={zoomStep}
				showBadge={showBadge}
				resizable={resizable}
				emojis={emojis}
				onAttachButtonClicked={onAttachButtonClicked}
			/>
		);
	}
}

export default Widget;
