import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GlobalState } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';
import { toggleChat } from '../../store/actions';

import Conversation from './components/Conversation';

import './style.scss';

type Props = {
	title: string;
	titleAvatar?: string;
	subtitle: string;
	onSendMessage: AnyFunction;
	onToggleConversation: AnyFunction;
	senderPlaceHolder: string;
	onQuickButtonClicked: AnyFunction;
	profileAvatar?: string;
	profileClientAvatar?: string;
	showCloseButton: boolean;
	fullScreenMode: boolean;
	autofocus: boolean;
	customLauncher?: AnyFunction;
	onTextInputChange?: (event: any) => void;
	chatId: string;
	launcherOpenLabel: string;
	launcherCloseLabel: string;
	launcherCloseImg: string;
	launcherOpenImg: string;
	sendButtonAlt: string;
	showTimeStamp: boolean;
	imagePreview?: boolean;
	zoomStep?: number;
	showBadge?: boolean;
	resizable?: boolean;
	emojis?: boolean;
};

function WidgetLayout({
	title,
	titleAvatar,
	subtitle,
	onSendMessage,
	onToggleConversation,
	senderPlaceHolder,
	onQuickButtonClicked,
	profileAvatar,
	profileClientAvatar,
	showCloseButton,
	fullScreenMode,
	autofocus,
	customLauncher,
	onTextInputChange,
	chatId,
	launcherOpenLabel,
	launcherCloseLabel,
	launcherCloseImg,
	launcherOpenImg,
	sendButtonAlt,
	showTimeStamp,
	imagePreview,
	zoomStep,
	showBadge,
	resizable,
	emojis,
}: Props) {
	const dispatch = useDispatch();
	const { dissableInput, showChat, visible } = useSelector((state: GlobalState) => ({
		showChat: state.behavior.showChat,
		dissableInput: state.behavior.disabledInput,
		visible: state.preview.visible,
	}));

	const messageRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (showChat) {
			messageRef.current = document.getElementById('messages') as HTMLDivElement;
		}
		return () => {
			messageRef.current = null;
		};
	}, [showChat]);

	useEffect(() => {
		toggleChat();
	}, []);

	return (
		<div
			className={cn('rcw-chat-container', {
				'rcw-full-screen': fullScreenMode,
			})}>
			<Conversation
				sendMessage={onSendMessage}
				senderPlaceHolder={senderPlaceHolder}
				profileAvatar={profileAvatar}
				profileClientAvatar={profileClientAvatar}
				toggleChat={onToggleConversation}
				showCloseButton={showCloseButton}
				disabledInput={dissableInput}
				autofocus={autofocus}
				titleAvatar={titleAvatar}
				className='active'
				onQuickButtonClicked={onQuickButtonClicked}
				onTextInputChange={onTextInputChange}
				sendButtonAlt={sendButtonAlt}
				showTimeStamp={showTimeStamp}
				resizable={resizable}
				emojis={false}
			/>
		</div>
	);
}

export default WidgetLayout;
